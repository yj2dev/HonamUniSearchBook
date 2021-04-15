# HonamUniSearchBook
호남대학교 도서관 검색도우미

<img src="https://cdn.discordapp.com/attachments/379240082378588160/832175177721839646/asdasd.PNG"><br>


# API

### 책 위치, 대출여부를 가지고오는 API<br>
 http://library.honam.ac.kr/cheetah/api/detail?<br>
 매개변수 : Cno=<책관리번호><br>

 ### 책을 검색하는 API<br>
 http://library.honam.ac.kr/cheetah/api/search?<br>
 매개변수<br>
 otwa1=<값> <검색할 종류 T = 서명 / TK = 서명 키워드 / A = 저자명 / AK = 저자명 키워드 / P = 출판사 /  IDX = 통합 / S = 주제명 / SK = 주제명 키워드 / X = 총서명 / XK = 총서명 키워드 / N = ISBN,ISSN / NC = 청구기호 / R = 등록번호 ><br>
 otod1=<값> < 검색할 내용 ><br>
 otbool1=<값> < A = AND / O = OR  N = NOT ><br>
 otpn1=<값>		< K = 키워드 / L = 전방일치 / M = 완전일치 ><br>
 
 otwa2~3 = <값> < 위 내용과 같음 여러개를 혼합하여 검색할때 사용  ex) 책이름 + 출판사 + 작가이름 ><br>
 otod2~3 = <값>  <br>
 otbool2~3 = <값>  <br>
 otpn2~3 = <값>  <br>

 otopt=<값> < 구지 매개변수로 안줘도 된다. 세세하게 검색할때만 사용 / all = 전체 / otb = 단행본 / ots = 연간물 / otn = 비도서 / ebook = e북 / otk = 위논문 ><br>
 lang=<값> < 다른언어로 된 책 검색하지 않는이상 사용안해도 된다. / kor = 한국어 / eng = 영어 / jpn = 일본어 / chi = 중국어 ><br>
 stype=<값> < 기본은 B로 되있으나 A로해도 별 차이가없음 매개변수를 주지 않아도 정상작동한다.><br>
 sp=<값> < 검색된 내용 중 몇 페이지를 볼것인가  기본:1  ><br>
 otyear1=<값> <시작연도>   <몇년~몇년 지정해서 검색하지 않는이상 사용X><br>
 otyear2=<값> <종료년도><br>
 trans=<값> < 사용할때만 on을 값으로 주고 그 외에는 매개변수로 주지 않아도됨. 漢文  한문> <br>
 tab=<값> < 잘 모르겠는데 basic값이 기본으로 되어있음. ><br>
 _=<값> < 값이 13자리 숫자로 이루어 져 있는데 내 정보를 식별하는 숫자인지 단순 검색횟수 카운터인지 잘 모르겠음. 해당 매개변수 넣지 않아도 정상작동. ><br>
