mkdir bin
copy src\AIRApp\*.* bin
copy src\static\*.* bin
copy src\*.* bin
copy *.p12 bin
cd bin
adt -package -storetype pkcs12 -keystore wildebeastgames_certificate.p12 -tsa none TravelerCharGen.air TravelerCharGen-app.xml TravelerCharGen.html *.js *.gif *.png *.jpg *.css
