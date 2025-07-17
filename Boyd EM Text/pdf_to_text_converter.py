# pdf_to_text_converter.py
#
# Description:
# This script uses the Meta AI "Nougat" model to perform Optical Character Recognition (OCR)
# on the E-M Theory PDF, converting it into structured Markdown.
#
# Prerequisites:
# Before running, ensure you have the necessary libraries installed via pip:
# pip install transformers torch sentencepiece Pillow "unstructured[pdf]" pypdf pypdfium2 python-dotenv
#
import torch
import pypdfium2 as pdfium
from pathlib import Path
from PIL import Image
from transformers import NougatProcessor, VisionEncoderDecoderModel
from dotenv import load_dotenv
import os

def load_environment():
    """
    Locates and loads the .env file from the sibling aiops_toolkit directory.
    This makes Hugging Face tokens available to the script.
    """
    # Robustly find the script's directory and navigate to the .env file
    script_dir = Path(__file__).parent.resolve()
    env_path = script_dir.parent.parent / 'aiops_toolkit' / '.env'
    
    if env_path.exists():
        print(f"Loading environment variables from: {env_path}")
        load_dotenv(dotenv_path=env_path, override=True)
        # Optional: Verify token loaded
        if os.getenv("HF_TOKEN"):
            print("Hugging Face token found and loaded.")
    else:
        print(f"Warning: .env file not found at {env_path}. Proceeding without it.")

def convert_pdf_to_markdown(pdf_path_str: str, output_path_str: str, model_name: str = "facebook/nougat-small"):
    """
    Converts a PDF document to structured Markdown using the Nougat model.
    It processes the PDF page by page to handle documents and resolve image type errors.

    Args:
        pdf_path_str (str): The path to the input PDF file.
        output_path_str (str): The path where the output Markdown file will be saved.
        model_name (str): The Hugging Face name of the Nougat model to use.
    """
    print("Initializing model and processor...")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    try:
        processor = NougatProcessor.from_pretrained(model_name)
        model = VisionEncoderDecoderModel.from_pretrained(model_name).to(device)
        print("Model and processor loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    input_path = Path(pdf_path_str)
    output_path = Path(output_path_str)

    if not input_path.is_file():
        print(f"Error: Input file not found at '{input_path}'")
        return

    try:
        # Convert PDF pages to a list of PIL Images
        print("Rendering PDF pages to images...")
        images = pdfium.render_pdf_to_pil(input_path)
        
        full_markdown = ""
        # Process each page (image) individually
        for i, image in enumerate(images):
            print(f"Processing page {i + 1}/{len(images)}...")
            pixel_values = processor(image, return_tensors="pt").pixel_values
            
            outputs = model.generate(
                pixel_values.to(device),
                min_length=1,
                max_length=model.config.max_length,
                bad_words_ids=[[processor.tokenizer.unk_token_id]],
            )
            
            sequence = processor.batch_decode(outputs, skip_special_tokens=True)[0]
            markdown_page = processor.post_process_generation(sequence, fix_markdown=True)
            full_markdown += markdown_page + "\n\n"

        print(f"Writing complete output to '{output_path.name}'...")
        with output_path.open("w", encoding="utf-8") as f:
            f.write(full_markdown)

        print("Conversion complete.")

    except Exception as e:
        print(f"An error occurred during PDF processing: {e}")

if __name__ == "__main__":
    # Load environment variables first
    load_environment()

    # Define file paths relative to the script's location
    PDF_FILE = "EM Theory.pdf"
    OUTPUT_FILE = "EM_MAR_1966_DECLASSIFIED.txt"
    
    # Run the conversion process
    convert_pdf_to_markdown(PDF_FILE, OUTPUT_FILE)
