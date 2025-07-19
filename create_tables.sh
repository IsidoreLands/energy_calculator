#!/bin/bash

# Navigate to the target directory
cd ~/energy_calculator/"Boyd EM Text" || { echo "Error: Directory not found."; exit 1; }

# Pull latest changes
git pull origin main

# Enter the folder and create placeholders
cd "Illustrations and Tables" || { echo "Error: Subdirectory not found."; exit 1; }
for table in I II III IV; do
    # Use single quotes to avoid bash expanding !
    echo '<!-- # placeholder -->' > "Table${table}.html"
done

echo "Tables created and pushed successfully."
