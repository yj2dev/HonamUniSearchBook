import requests
import urllib.parse
import json

 # [0] 대출가능여부 ㅣ [1] 책위치(몇층인지) ㅣ [2] 책위치(번호) ㅣ [3] 대출자학번(가림) ㅣ [4] 대출자이름(가림) ㅣ [5] 도서 반납 예정일 ㅣ [6] 대출자학번 ㅣ [7] 대출자이름
def SerchBorrowInfo(cno):
  url = "http://library.honam.ac.kr/cheetah/api/detail?Cno="+cno
  req = requests.get(url)
  req = json.loads(req.text)

  borrowInfo = []
  try:
    for borrow in req["RnoList"]:
      temp = []
      CFType = borrow["CFType"]                         # 대출 가능 여부
      Position = borrow["Position"]                     # 도서관내 책 위치(층 정보 ex 2층 문학자료실)
      CallNumber =borrow["CallNumber"].strip()          # 도서관내 책 위치(책 정보 ex 813.6 이39ㄷ)
      LentUser = borrow["LentUesr"]                     # 도서 대출자 학번(일부 가림형태)
      LentUserName = borrow["LentUesrName"]             # 도서 대출자 이름(일부 가림형태)
      Period = borrow["Period"]                         # 도서 반납 예정일
      RnoStatus = borrow["RnoStatus"]                   # 책 대출정보&반납일&대출자학번&대출자이름
      stamnummer = RnoStatus[RnoStatus.find("=")+1:RnoStatus.rfind("=")]
      borrower = RnoStatus[RnoStatus.rfind("=")+1:]
      temp.append(CFType)
      temp.append(Position)
      temp.append(CallNumber)
      temp.append(LentUser)
      temp.append(LentUserName)
      temp.append(Period)
      temp.append(stamnummer)
      temp.append(borrower)
      borrowInfo.append(temp)
  except:
    pass
  return borrowInfo