#!/bin/bash

curl  http://localhost/api/v1.0/reports | json_pp > reports.json
curl  http://localhost/api/v1.0/profiles | json_pp > profiles.json
curl  http://localhost/api/v1.0/processors | json_pp > processors.json
