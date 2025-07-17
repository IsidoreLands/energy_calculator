# pdf_to_text_converter.py
#
# Description:
# This script uses the Meta AI "Nougat" model to perform Optical Character Recognition (OCR)
# on the E-M Theory PDF, converting it into structured Markdown.
#
# Prerequisites:
# Before running, ensure you have the necessary libraries installed via pip:
# pip install transformers torch sentencepiece Pillow "unstructured[pdf]" pypdf
#
import torch
from pathlib import Path
from transformers import NougatProcessor, VisionEncoderDecoderModel

def convert_pdf_to_markdown(pdf_path_str: str, output_path_str: str, model_name: str = "facebook/nougat-small"):
    """
    Converts a PDF document to structured Markdown using the Nougat model.

    This function loads the specified Nougat model from Hugging Face, processes the input PDF,
    and saves the resulting Markdown text to the specified output file.

    Args:
        pdf_path_str (str): The path to the input PDF file.
        output_path_str (str): The path where the output Markdown file will be saved.
        model_name (str): The Hugging Face name of the Nougat model to use.
    """
    print("Initializing model and processor...")
    # Check for a CUDA-compatible GPU and set the device accordingly for faster processing.
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    try:
        processor = NougatProcessor.from_pretrained(model_name)
        model = VisionEncoderDecoderModel.from_pretrained(model_name).to(device)
        print("Model and processor loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Please ensure you have an internet connection and the required libraries are installed.")
        return

    input_path = Path(pdf_path_str)
    output_path = Path(output_path_str)

    if not input_path.is_file():
        print(f"Error: Input file not found at '{input_path}'")
        return

    try:
        print(f"Processing PDF: '{input_path.name}'...")
        # The Nougat processor converts the PDF into pixel values for the model.
        pixel_values = processor(input_path, return_tensors="pt").pixel_values

        # The model generates token IDs from the pixel values.
        outputs = model.generate(
            pixel_values.to(device),
            min_length=1,
            max_length=32768,  # Set a high max length to accommodate dense documents.
            bad_words_ids=[[processor.tokenizer.unk_token_id]],
        )

        # The processor decodes the token IDs and performs post-processing to clean up the Markdown.
        sequence = processor.batch_decode(outputs, skip_special_tokens=True)[0]
        markdown_text = processor.post_process_generation(sequence, fix_markdown=True)

        print(f"Writing output to '{output_path.name}'...")
        with output_path.open("w", encoding="utf-8") as f:
            f.write(markdown_text)

        print("Conversion complete.")

    except Exception as e:
        print(f"An error occurred during PDF processing: {e}")

if __name__ == "__main__":
    # Define the file paths relative to the script's location in the 'Boyd EM Text' directory.
    PDF_FILE = "EM Theory.pdf"
    OUTPUT_FILE = "EM_MAR_1966_DECLASSIFIED.txt"
    
    # Run the conversion process.
    convert_pdf_to_markdown(PDF_FILE, OUTPUT_FILE)
