cd D://parse
set source=D:\parse
set destination=D:\ember-http\pinnacle\public
xcopy %source% %destination% /s /y
cd D://ember-http/pinnacle
parse default
parse deploy
set source=D:\parse\public\assets
set destination=D:\ember-http\MyCloudCode\public\assets
xcopy %source% %destination% /s /y
cd D://ember-http/MyCloudCode
parse default
parse deploy
cd D://emberParse/ember-parse-bb
ember s
