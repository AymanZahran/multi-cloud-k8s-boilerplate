#!/bin/bash
echo "Running kubeval validations..."
if ! [ -x "$(command -v kubeval)" ]; then
  echo 'Error: kubeval is not installed.' >&2
  exit 1
fi
if kubeval --ignore-missing-schemas dist/*; then
  echo "Static analysis found no problems."
  exit 0
else
  echo 1>&2 "Static analysis found violations that need to be fixed."
  exit 1
fi
