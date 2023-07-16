#!/bin/bash
mkdir -p ~/.terraform.d
echo '{
    "credentials": {
      "app.terraform.io": {
        "token": "${{ secrets.TF_API_TOKEN }}"
      }
    }
  }' >~/.terraform.d/credentials.tfrc.json
