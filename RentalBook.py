import requests
import urllib.parse
import json
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def SearchRentalInfo(cno):
  url = "http://library.honam.ac.kr/cheetah/api/detail?Cno="+cno
  req = requests.get(url)
  req = json.loads(req.text)

  try:
    for rental in req["RnoList"]:
      position = rental["Position"]                   # 도서관내 책 위치(층 정보 ex 2층 문학자료실)
      callNumber = rental["CallNumber"].strip().replace("   ","").replace("  ","")        # 도서관내 책 위치(책 정보 ex 813.6 이39ㄷ)
      location = callNumber+"("+position+")"
      RnoStatus = rental["RnoStatus"]                   # 책 대출정보&반납일&대출자학번&대출자이름
      rentalerId = rental["LentUesr"]                   # 대출자 학번(일부 가림)
      rentalerName = rental["LentUesrName"]             # 대출자 이름(일부 가림)
      returnPeriod = rental["Period"]                   # 반납 예정일
      
      if returnPeriod == "":
        returnPeriod = "　"
      
      if rentalerId != "":
        rentaler = rentalerName + "(" + rentalerId + ")"
      else:
        rentaler = "　"
      # stamnummer = RnoStatus[RnoStatus.find("=")+1:RnoStatus.rfind("=")] # 대출자 학번
      # rentaler = RnoStatus[RnoStatus.rfind("=")+1:]                      # 대출자 이름
      
      # [ 대출가능 or 대출중 ] 상태가 아닌 도서 출력값 설정 
      if "배가중" in RnoStatus:
        print("배가중")
      elif "진로개발센터" in RnoStatus:
        print("진로센터")
      else:
        print(rental["CFType"])                   # 대출 가능 여부
      print(location)                             # 도서 정보
      print(rentaler)                             # 대출자 정보
      print(returnPeriod)                         # 도서 반납 예정일                      / 대출가능 상태일경우 빈칸으로 출력됨.(의도)
  # 대출정보가 없을때 ( 전자책, 논문, 비도서 등 )
  except KeyError:                                                                                  
    print("NULL")

if __name__ == '__main__':
  SearchRentalInfo(sys.argv[1])
