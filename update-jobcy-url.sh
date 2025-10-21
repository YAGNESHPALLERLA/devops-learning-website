#!/bin/bash

# Script to update Jobcy URL across the DevOps Learning Website
# Usage: ./update-jobcy-url.sh <new-url>
#
# Example: ./update-jobcy-url.sh https://jobcy-portal.vercel.app

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if URL argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide the new Jobcy URL${NC}"
    echo "Usage: ./update-jobcy-url.sh <new-url>"
    echo "Example: ./update-jobcy-url.sh https://jobcy-portal.vercel.app"
    exit 1
fi

NEW_URL=$1
OLD_URL="https://github.com/Karthik2340/jobcy-job-portal"
FILE_PATH="src/app/page.tsx"

echo -e "${YELLOW}Jobcy URL Update Script${NC}"
echo "======================================"
echo -e "Old URL: ${RED}${OLD_URL}${NC}"
echo -e "New URL: ${GREEN}${NEW_URL}${NC}"
echo "File: ${FILE_PATH}"
echo "======================================"
echo

# Confirm with user
read -p "Do you want to proceed with the update? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Update cancelled${NC}"
    exit 0
fi

# Create backup
BACKUP_FILE="${FILE_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
echo -e "${YELLOW}Creating backup: ${BACKUP_FILE}${NC}"
cp "${FILE_PATH}" "${BACKUP_FILE}"

# Count occurrences
COUNT=$(grep -o "${OLD_URL}" "${FILE_PATH}" | wc -l)
echo -e "${YELLOW}Found ${COUNT} occurrences of the old URL${NC}"

# Perform replacement
if [ "$COUNT" -gt 0 ]; then
    sed -i "s|${OLD_URL}|${NEW_URL}|g" "${FILE_PATH}"
    echo -e "${GREEN}✓ Successfully updated all ${COUNT} occurrences${NC}"
    echo
    
    # Show updated lines
    echo -e "${YELLOW}Updated lines:${NC}"
    grep -n "${NEW_URL}" "${FILE_PATH}" | head -10
    
    if [ "$COUNT" -gt 10 ]; then
        echo -e "${YELLOW}... and $((COUNT - 10)) more${NC}"
    fi
    echo
    
    # Update .env.local if it exists
    ENV_FILE=".env.local"
    if [ -f "$ENV_FILE" ]; then
        if grep -q "NEXT_PUBLIC_JOBCY_URL" "$ENV_FILE"; then
            sed -i "s|NEXT_PUBLIC_JOBCY_URL=.*|NEXT_PUBLIC_JOBCY_URL=${NEW_URL}|" "$ENV_FILE"
            echo -e "${GREEN}✓ Updated ${ENV_FILE}${NC}"
        else
            echo "NEXT_PUBLIC_JOBCY_URL=${NEW_URL}" >> "$ENV_FILE"
            echo -e "${GREEN}✓ Added NEXT_PUBLIC_JOBCY_URL to ${ENV_FILE}${NC}"
        fi
    else
        echo "NEXT_PUBLIC_JOBCY_URL=${NEW_URL}" > "$ENV_FILE"
        echo -e "${GREEN}✓ Created ${ENV_FILE} with NEXT_PUBLIC_JOBCY_URL${NC}"
    fi
    
    echo
    echo -e "${GREEN}======================================"
    echo "Update Complete!"
    echo "======================================${NC}"
    echo
    echo "Next steps:"
    echo "1. Review the changes: git diff ${FILE_PATH}"
    echo "2. Test the website: npm run dev"
    echo "3. Verify all links work correctly"
    echo "4. Commit the changes: git add . && git commit -m 'Update Jobcy URL'"
    echo
    echo -e "${YELLOW}Backup saved as: ${BACKUP_FILE}${NC}"
    echo "To restore: mv ${BACKUP_FILE} ${FILE_PATH}"
else
    echo -e "${YELLOW}No occurrences found. URL might already be updated.${NC}"
fi

