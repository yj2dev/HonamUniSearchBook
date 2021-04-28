import requests
import urllib.parse
import json
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def SearchLibraryBookPossessionPage(bookTitle, searchType,sp):

  # API 검색 부분
  api = "http://library.honam.ac.kr/cheetah/api/search?"
  values = {
  "otwa1":searchType,       # T = 서명 / A = 저자명 /  P = 출판사 
  "otod1": bookTitle,       # 검색할 문자열
  "otbool1":"A",            # A = AND / O = OR  N = NOT
  "otpn1":"K",              # K = 키워드 / L = 전방일치 / M = 완전일치
  "sp":sp                  # 1 페이지 검색결과
  }
  params = urllib.parse.urlencode(values)
  url = api + params
  req = requests.get(url)
  req = json.loads(req.text)
  imgUrl = "http://library.honam.ac.kr/Cheetah/Shared/CoverImage?Cno="

  # [에러처리]검색한 페이지에 자료가 없을경우 NULL 출력
  if len(req["ListItem"]["BasicItem"]) < 1:
    print("NULL")
  else:
    totalPages = req["PagingInfo"]["TotalPages"]        # 총 페이지 수
    currentPage = req["PagingInfo"]["CurrentPage"]      # 호출된 페이지 넘버
  # 해당 페이지에 있는 책 정보를 출력
  for search in req["ListItem"]["BasicItem"]:
    cno = search["Cno"]   
    subCategory = search["SubCategory"]  
    print(search["Title"])         # [0]책 제목
    print(search["Author"])        # [1]작가
    print(search["Publisher"])     # [2]출판사
    print(search["PublishYear"])   # [3]책 출판년도
    print(cno)                     # [4]책목록 번호
    print(imgUrl+str(cno))         # [5]책 이미지
    if search["RnoNum"] == None:   # [6]책 대출 가능한가 ( 출력이 0이면 대출정보가 없는책 / 출력이 1이면 대출이 가능한 책)
      print("0")
    else:
      print("1")

    if subCategory == "otb":        # [7] 책 카테고리
      print("단행본")
    elif subCategory =="ots":
      print("연간물")
    elif subCategory =="otn":
      print("비도서")
    elif subCategory =="ebook":
      print("전자책")
    elif subCategory =="otk":
      print("힉위논문")
    else:
      print("정보없음")
    print(totalPages)
    print(currentPage)
if __name__ == '__main__':
    SearchLibraryBookPossessionPage(sys.argv[1], sys.argv[2], sys.argv[3]) 

