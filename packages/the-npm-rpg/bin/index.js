#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

// This file is just a wrapper around the bundled JS.
// This allows us to add chmod+x and a shebang

require('../dist/bundled')
