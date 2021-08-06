import requests
from bs4 import BeautifulSoup as Soup
import json

f = open('sheltercoord.json', 'rt', encoding='UTF8')
shelterJson = json.load(f)


url = "http://openapi.animal.go.kr/openapi/service/rest/animalShelterSrvc/shelterInfo?serviceKey=1ue1B%2F%2BAyZt6YT5FD9QwHPsG%2BIAXeOU0zhlXlNKevbrnJPbJ81zInGB0jcGQ2QJWfqdHMsZUudy4fPjX0%2F1flQ%3D%3D&&numOfRows=1000"
xmlsoup = Soup(requests.get(url).content,"lxml")

list = []
repElemList = xmlsoup.find_all('item')

for repElem in repElemList:

    if repElem.find('lng'):
        lng = repElem.find('lng').get_text()
    else:
        for elem in shelterJson['item']:
            if str(elem['name']) == str(repElem.find('carenm').get_text()):
                lng = str(elem['lng'])
    if repElem.find('lat'):
        lat = repElem.find('lat').get_text()
    else:
        for elem in shelterJson['item']:
            if str(elem['name']) == str(repElem.find('carenm').get_text()):
                lat = str(elem['lat']) 
    if repElem.find('careaddr'):
        careAddr = str(repElem.find('careaddr').get_text())
    else:
        careAddr = ''
    if repElem.find('carenm'):
        careNm = repElem.find('carenm').get_text()
    else:
        careNm = ''
    if repElem.find('caretel'):
        careTel = repElem.find('caretel').get_text()
    else:
        careTel = ''
    if repElem.find('closeday'):
        closeDay = repElem.find('closeday').get_text()
    else:
        closeDay = ''
    if repElem.find('datastddt'):
        dataStdDt = repElem.find('datastddt').get_text()
    else:
        dataStdDt = ''
    if repElem.find('divisionnm'):
        divisionNm = repElem.find('divisionnm').get_text()
    else:
        divisionNm = ''
    if repElem.find('dsignationdate'):
        dsignationDate = repElem.find('dsignationdate').get_text()
    else:
        dsignationDate = ''
    if repElem.find('jibunaddr'):
        jibunAddr = repElem.find('jibunaddr').get_text()
    else:
        jibunAddr = ''
    if repElem.find('orgnm'):
        orgNm = repElem.find('orgnm').get_text()
    else:
        orgNm = ''
    if repElem.find('rnum'):
        rnum = repElem.find('rnum').get_text()
    else:
        rnum = ''
    if repElem.find('savetrgtanimal'):
        saveTrgtAnimal = repElem.find('savetrgtanimal').get_text()
    else:
        saveTrgtAnimal = ''
    if repElem.find('specspersoncnt'):
        specsPersonCnt = repElem.find('specspersoncnt').get_text()
    else:
        specsPersonCnt = ''
    if repElem.find('weekcelletime'):
        weekCellEtime = repElem.find('weekcelletime').get_text()
    else:
        weekCellEtime = ''
    if repElem.find('weekcellstime'):
        weekCellStime = repElem.find('weekcellstime').get_text()
    else:
        weekCellStime = ''
    if repElem.find('weekopretime'):
        weekOprEtime = repElem.find('weekopretime').get_text()
    else:
        weekOprEtime = ''
    if repElem.find('weekoprstime'):
        weekOprStime = repElem.find('weekoprstime').get_text()
    else:
        weekOprStime = ''
    if repElem.find('weekendcelletime'):
        weekendCellEtime = repElem.find('weekendcelletime').get_text()
    else:
        weekendCellEtime = ''
    if repElem.find('weekendcellstime'):
        weekendCellStime = repElem.find('weekendcellstime').get_text()
    else:
        weekendCellStime = ''
    if repElem.find('weekendopretime'):
        weekendOprEtime = repElem.find('weekendopretime').get_text()
    else:
        weekendOprEtime = ''
    if repElem.find('weekendoprstime'):
        weekendOprStime = repElem.find('weekendoprstime').get_text()
    else:
        weekendOprStime = ''

    data = {
        "lng": lng, 
        "lat": lat, 
        "careAddr": str(careAddr),
        "careNm": careNm, 
        "careTel": careTel,
        "closeDay": closeDay,
        "dataStdDt": dataStdDt, 
        "divisionNm": divisionNm, 
        "dsignationDate": dsignationDate, 
        "jibunAddr": jibunAddr, 
        "orgNm": orgNm, 
        "rnum": rnum, 
        "saveTrgtAnimal": saveTrgtAnimal, 
        "specsPersonCnt": specsPersonCnt, 
        "weekCellEtime": weekCellEtime, 
        "weekCellStime": weekCellStime, 
        "weekOprEtime": weekOprEtime, 
        "weekOprStime": weekOprStime, 
        "weekendCellEtime": weekendCellEtime, 
        "weekendCellStime": weekendCellStime, 
        "weekendOprEtime": weekendOprEtime, 
        "weekendOprStime": weekendOprStime, 
    }
    list.append(data)

with open('shelter.txt', mode='wt', encoding='utf-8') as myfile:
    for line in list:
        myfile.write(str(line)+",\n")

print("hello")
