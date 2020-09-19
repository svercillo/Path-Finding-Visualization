filepath = 'unavailibleAirports.txt'
f = open(filepath, "r", encoding="utf8")
line = f.readline()

set = {'a'}
while line:
    set.add(line[0:len(line)-1])
    line = f.readline()

set.remove('a')
f.close()

filepath = 'openflights/data/airports-extended.dat' 
airportdata = {}
airports = {}
routes = {}

f = open(filepath, "r", encoding="utf8")
line = f.readline()
# skip the first line 
line = f.readline()
while line:
    inds = []
    inexpres = False
    for i in range(0, len(line)):
        if line[i] == '"':
            if inexpres:
                inexpres = False
            else:
                inexpres = True
        if line[i] == ',' and not inexpres:
            inds.append(i)

    airports[line[inds[3]+2: inds[4]-1]] = {} 
    airports[line[inds[3]+2: inds[4]-1]]["country"] = line[inds[2]+2 : inds[3]-1]
    airports[line[inds[3]+2: inds[4]-1]]['coords'] = {}
    airports[line[inds[3]+2: inds[4]-1]]['coords']["latitude"] = float(line[inds[5]+1: inds[6]])
    airports[line[inds[3]+2: inds[4]-1]]['coords']["longitude"] = float(line[inds[6]+1: inds[7]])
    airports[line[inds[3]+2: inds[4]-1]]["name"] = line[inds[0]+2: inds[1]-1]
    line = f.readline()

f.close()

filepath = 'openflights/data/routes.dat'
f = open(filepath, "r", encoding="utf8")
line = f.readline()
while line:
    inds = []
    for i in range(0, len(line)):
        if line[i] == ',' :
            inds.append(i)
    if line[inds[1] +1 : inds[2]] not in set:
            if line[inds[1] +1 : inds[2]] not in routes:
                routes[line[inds[1] +1 : inds[2]]] = []
            if line[inds[3] +1 : inds[4]] not in routes[line[inds[1] +1 : inds[2]]]:
                routes[line[inds[1] +1 : inds[2]]].append(line[inds[3] +1 : inds[4]])
    line = f.readline()

f.close()
airportdata['airports'] = airports
airportdata['routes'] = routes

print(routes['AER'])