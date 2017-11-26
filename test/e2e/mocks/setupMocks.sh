#!/bin/bash

curl  http://localhost/reports | json_pp > reports.json
curl  http://localhost/profiles | json_pp > profiles.json
curl  http://localhost/processors | json_pp > processors.json
