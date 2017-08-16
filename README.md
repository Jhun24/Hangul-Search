# Hangul-Search

### /GET : /parse/word?word=단어이름

> require

>> word : 검색할 단어

> response

> Succcess :

>> status : 200
 
>> word : 단어의 뜻 XML

> Fail : 

>> stauts : 404

### /GET : /parse/translate?word=단어이름

> require

>> word : 검색할 단어

> response

> Success :

>> stauts : 200

>> word : 번역한 영단어

> Fail : 

> status : 404
 
### /GET : /parse/star/plus?word=단어이름

> require

>> word : 스타를 추가할 단어

> response

> Success :

>> stauts : 200

>> star : 햔제 스타 개수

> Fail :

>> status : 404

### /GET : /parse/star/minus?word=단어이름

> require

>> word : 스타를 깎을 단어

> response

> Success :

>> stauts : 200

>> star : 햔제 스타 개수

> Fail :

>> status : 404

### /GET : /rank/week

> require 

>> 없음

> Success : 

>> status : 200

>> rank : 주간 따봉으로 정렬된 Array

> Fail

>> status : 404

### /GET : /rank/month

> require 

>> 없음

> Success : 

>> status : 200

>> rank : 월간 따봉으로 정렬된 Array

> Fail

>> status : 404


### /GET : /rank/star

> require 

>> 없음

> Success : 

>> status : 200

>> rank : 즐찿으로 정렬된 Array

> Fail

>> status : 404

