import requests
import urllib.parse
import json

# 사용자가 입력한 책이 호남대학교 도서관에 소장중인지 확인하는 함수
def SearchLibraryBookPossession(bookTitle, searchType):
  # api 주소
  api = "http://library.honam.ac.kr/cheetah/api/search?"
  # 세부검색 설정
  values = {
    "otwa1":searchType,        # T = 서명 / TK = 서명 키워드 / A = 저자명 / AK = 저자명 키워드 / P = 출판사 
                        # IDX = 통합 / S = 주제명 / SK = 주제명 키워드 / X = 총서명 / XK = 총서명 키워드 / N = ISBN,ISSN / NC = 청구기호 / R = 등록번호 
    "otod1": bookTitle, # 검색할 문자열
    "otbool1":"A",      # A = AND / O = OR  N = NOT
    "otpn1":"K",        # K = 키워드 / L = 전방일치 / M = 완전일치
    "sp":"1"            # 1 페이지 검색결과

    ########################################
    # << 여러 조건으로 검색할때 사용 / 추후 업데이트 예정 >>
    # "otwa2":"A",
    # "otod2": "",
    # "otbool2":"A",
    # "otpn2":"K",.

    # "otwa3":"P",   
    # "otod3": "",
    # "otbool3":"A",
    # "otpn3":"K",
  #########################################
  }
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
    # isbn = search["ISBN"]               # 책 ISBN
    # callNumber = search["CallNumber"]   # 도서관 책 위치
    cno = search["Cno"]                   # 호대 책관리 번호
    bookImg = "http://library.honam.ac.kr/Cheetah/Shared/CoverImage?Cno=" + str(cno)
    temp.append(bookTitle)
    temp.append(author)
    temp.append(publisher)
    temp.append(publishYear)
    # temp.append(isbn)
    # temp.append(callNumber)
    temp.append(cno)
    temp.append(bookImg)
    bookSearchData.append(temp)
  return bookSearchData