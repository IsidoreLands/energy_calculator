# pdf_to_text_converter.py
#
# Description:
# This script uses the Meta AI "Nougat" model to perform Optical Character Recognition (OCR)
# on the E-M Theory PDF, converting it into structured Markdown.
#
# Prerequisites:
# pip install transformers torch sentencepiece Pillow "unstructured[pdf]" pypdf pypdfium2 python-dotenv python-Levenshtein
#
import torch
import pypdfium2 as pdfium
from pathlib import Path
from transformers import NougatProcessor, VisionEncoderDecoderModel
from dotenv import load_dotenv
import os

def load_environment():
    """
    Locates and loads a .env file.
    It prioritizes a local .env file in the project root and falls back
    to the .env file in the sibling aiops_toolkit directory.
    """
    script_dir = Path(__file__).parent.resolve()
    
    local_env_path = script_dir.parent / '.env'
    if local_env_path.exists():
        print(f"Loading environment variables from local: {local_env_path}")
        load_dotenv(dotenv_path=local_env_path, override=True)
        if os.getenv("HF_TOKEN"):
            print("Hugging Face token found and loaded from local .env.")
        return

    fallback_env_path = script_dir.parent.parent / 'aiops_toolkit' / '.env'
    if fallback_env_path.exists():
        print(f"Loading environment variables from fallback: {fallback_env_path}")
        load_dotenv(dotenv_path=fallback_env_path, override=True)
        if os.getenv("HF_TOKEN"):
            print("Hugging Face token found and loaded from fallback .env.")
        return

    print("Warning: No .env file found. Proceeding without loading custom environment.")

def convert_pdf_to_markdown(pdf_path_str: str, output_path_str: str, model_name: str = "facebook/nougat-small"):
    """
    Converts a PDF document to structured Markdown using the Nougat model.
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
        print("Rendering and processing PDF page by page...")
        full_markdown = ""
        doc = pdfium.PdfDocument(str(input_path))
        try:
            num_pages = len(doc)
            if num_pages == 0:
                raise RuntimeError("PDF contains no pages.")

            for i in range(num_pages):
                print(f"Processing page {i + 1}/{num_pages}...")
                page = doc[i]
                bitmap = page.render()
                pil_image = bitmap.to_pil()

                # Process the image immediately to manage memory
                pixel_values = processor(pil_image, return_tensors="pt").pixel_values

                outputs = model.generate(
                    pixel_values.to(device),
                    min_length=1,
                    max_length=model.config.max_length,
                    bad_words_ids=[[processor.tokenizer.unk_token_id]],
                )

                sequence = processor.batch_decode(outputs, skip_special_tokens=True)[0]
                markdown_page = processor.post_process_generation(sequence, fix_markdown=True)
                full_markdown += markdown_page + "\n\n"

        finally:
            # Ensure the document is closed no matter what
            doc.close()
        
        print(f"Writing complete output to '{output_path.name}'...")
        with output_path.open("w", encoding="utf-8") as f:
            f.write(full_markdown)

        print("Conversion complete.")

    except Exception as e:
        print(f"An error occurred during PDF processing: {e}")

if __name__ == "__main__":
    load_environment()
    PDF_FILE = "EM Theory.pdf"
    OUTPUT_FILE = "EM_MAR_1966_DECLASSIFIED.txt"
    convert_pdf_to_markdown(PDF_FILE, OUTPUT_FILE)
