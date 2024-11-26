import requests 


def main():
    url = 'https://www.cnn.com'
    response = requests.get(url)
    print(response.text)


if __name__ == '__main__':
    main()