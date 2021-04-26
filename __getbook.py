## 노트북환경에서 파이썬이 되지않아 임시로 사용할 파일
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')


def dump(a, b, c):
    print("AAAA")         
    print("BBBB")        
 

if __name__ == '__main__':
  dump(sys.argv[1])
