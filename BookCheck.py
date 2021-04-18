import requests
import urllib.parse
import json
from bs4 import BeautifulSoup

def bookSearchResultPage(keyword, searchType):
  # api 주소
  api = "http://library.honam.ac.kr/cheetah/api/search?"
  # 세부검색 설정
  values = {
    "otwa1":searchType, # T = 도서명 / A = 저자명 / P = 출판사명 
    "otod1": keyword,   # 검색할 문자열
    "otbool1":"A",      # A = AND / O = OR  N = NOT
    "otpn1":"K",        # K = 키워드 / L = 전방일치 / M = 완전일치
    "sp":"1"            # 1 페이지 검색결과 < 페이지당 최대 10개밖에 안불러와짐 >

    # << 여러 조건으로 검색할때 사용 / 아직 미제공 >>
    #  "otwa2":"A",
    #  "otod2": "",
    #  "otbool2":"A",
    #  "otpn2":"K",.

    #  "otwa3":"P",   
    #  "otod3": "",
    #  "otbool3":"A",
    #  "otpn3":"K",
  # T = 서명 / TK = 서명 키워드 / A = 저자명 / AK = 저자명 키워드 / P = 출판사 / IDX = 통합 / S = 주제명 / SK = 주제명 키워드 / X = 총서명 / XK = 총서명 키워드 / N = ISBN,ISSN / NC = 청구기호 / R = 등록번호 

  }

  # 인코딩 후 링크 생성
  params = urllib.parse.urlencode(values)
  url = api + params

  req = requests.get(url)
  req = json.loads(req.text)
  bookSearchData = [] # 검색결과 저장
  for search in req["ListItem"]["BasicItem"]:
    temp = []
    bookTitle = search["Title"]           # 책 제목
    author = search["Author"]             # 작가
    publisher = search["Publisher"]       # 출판사
    publishYear = search["PublishYear"]   # 책 출판년도
    callNumber = search["CallNumber"]     # 책 청구기호
    if callNumber != "":
      callNumber = "("+callNumber+")"
    cno = search["Cno"]                   # 호대 책관리 번호
    bookImg = "http://library.honam.ac.kr/Cheetah/Shared/CoverImage?Cno=" + str(cno)
    newBookTitle = bookTitle + "(" + str(publishYear) + ")"
    # 대출정보 확인하기
    bookRentalNum = 0
    # 혹시모를 예외 방지 try문
    try:
      url2 = "https://library.honam.ac.kr/cheetah/Search/RnoSimpleList?Cno="+cno
      req2 = requests.get(url2)
      soup = BeautifulSoup(req2.text,'html.parser')
      data = soup.select("tbody > tr")
      bookWhere = "알수없음"

      # 대출가능 권수 계산 ( 쌍촌분관에 있는 책은 제외 )
      for bookData in data:
        if (bookData.select_one("td:nth-child(3)").text.strip() != "쌍촌분관"):
          bookWhere = bookData.select_one("td:nth-child(3)").text.strip()
          if bookData.select_one("td:nth-child(4)").text.strip() == "대출가능":
            bookRentalNum = bookRentalNum + 1

      if bookRentalNum > 0:
        isRental = str(bookRentalNum) + "권 대출가능"
      else:
        isRental = "대출불가"
    except:
      isRental = "대출불가"
    bookLocation = bookWhere+callNumber
    temp.append(bookImg)
    temp.append(newBookTitle)
    temp.append(author)
    temp.append(publisher)
    temp.append(bookLocation)
    temp.append(isRental)
    bookSearchData.append(temp)

  return bookSearchData




