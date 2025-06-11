import os
from PIL import Image

# Set the folder containing the images
input_folder = "visual_asset/zine"   # change this to your folder name
output_folder = "output_webp/zine"   # converted images will go here

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Supported formats to convert
supported_formats = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.gif')

for filename in os.listdir(input_folder):
    if filename.lower().endswith(supported_formats):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + ".webp")

        try:
            with Image.open(input_path) as img:
                img.save(output_path, "WEBP")
                print(f"Converted: {filename} → {output_path}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}") 