import requests
from bs4 import BeautifulSoup

def fetch_and_parse_google_doc(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return [(int(cells[0].text), int(cells[2].text), cells[1].text.strip())
            for row in soup.find_all('tr')[1:]
            for cells in [row.find_all('td')]]

def display_secret_message(url):
    data = fetch_and_parse_google_doc(url)
    max_x, max_y = max(x for x, _, _ in data), max(y for _, y, _ in data)
    grid = [[' ']*(max_x + 1) for _ in range(max_y + 1)]
    for x, y, char in data:
        grid[y][x] = char
    print("\n".join("".join(row) for row in grid))

display_secret_message("url")