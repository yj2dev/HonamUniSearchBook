import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def sendBookInfo(book, bookcode):
    print("Book : ", book, "\nBook-code : ", bookcode)


if __name__ == '__main__':
    sendBookInfo(sys.argv[1], sys.argv[2])