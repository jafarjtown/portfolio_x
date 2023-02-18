
from tesla.static import staticfiles
from tesla import TeslaApp

import os
from pathlib import Path as Pa
from tesla.utils import get_pages, config_api_route

BASE_DIR = Pa(__file__).resolve().parent.parent 

if os.path.isdir(BASE_DIR / 'pages'):
    TeslaApp.frontend = BASE_DIR / 'pages'
if os.path.isdir(BASE_DIR / 'controls'):
    TeslaApp.backend = BASE_DIR / 'controls'
TeslaApp.base_dir = BASE_DIR

TeslaApp.templates_folders = [
    TeslaApp.frontend,
]
TeslaApp.mount('/', get_pages(TeslaApp.frontend), app_name='app')
config_api_route(('api_v1'))
staticfiles.paths = [ os.path.join(BASE_DIR, 'static')]
