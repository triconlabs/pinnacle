call ember build --environment=production --output-path=/parse
cd D://parse
set source=D:\parse
set destination=D:\ember-http\pinnacle\public
xcopy %source% %destination% /s /y /q
cd D://ember-http/pinnacle
echo 'deploying to PINNACLE-BETA'
call parse deploy
cd D://ember-http/MyCloudCode
set source=D:\parse\assets
set destination=D:\ember-http\MyCloudCode\public\assets
xcopy %source% %destination% /s /y /q
echo 'deploying to PINNACLE-TEST'
call parse deploy
cd D://emberParse/ember-parse-bb

