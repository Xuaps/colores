#!/bin/bash
#
# Build and iPhone Simulator Helper Script
# Shazron Abdullah 2011
#
# WARN: - if your .xcodeproj name is not the same as your .app name, 
#		    this won't work without modifications
#		- you must run this script in where your .xcodeproj file is
 
PROJECTNAME=Colors
CONFIGURATION=Debug
LOGFILE=stderr.log
 
tools/bake.sh
rsync -cr media ejecta/App/.
rsync -c game.min.js ejecta/App/.
xcodebuild -configuration $CONFIGURATION -sdk iphonesimulator7.1 -project ejecta/$PROJECTNAME.xcodeproj -arch i386 clean build
ios-sim launch ejecta/build/$CONFIGURATION-iphonesimulator/$PROJECTNAME.app --family ipad --stderr $LOGFILE --exit 
tail -f $LOGFILE 