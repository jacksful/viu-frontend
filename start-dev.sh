#!/bin/bash
export PATH="/usr/local/bin:$PATH"
cd /Users/mehedihas/Downloads/VIU
npx next dev --port ${PORT:-3000}
