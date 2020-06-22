filepath = 'openflights/data/airports.dat' 
airportdata = {}
airports = {}
routes = {}

f = open(filepath, "r", encoding="utf8")
line = f.readline()
while line:
    inds = []
    for i in range(0, len(line)):
        if line[i] == ',' :
            inds.append(i)
    airports[line[inds[3]+2: inds[4]-1]] = {} 
    airports[line[inds[3]+2: inds[4]-1]]["country"] = line[inds[2]+2 : inds[3]-1]
    airports[line[inds[3]+2: inds[4]-1]]["longitude"] = line[inds[5]+1: inds[6]]
    airports[line[inds[3]+2: inds[4]-1]]["latitude"] = line[inds[6]+1: inds[7]]
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
    if line[inds[1] +1 : inds[2]] not in routes:
        routes[line[inds[1] +1 : inds[2]]] = []
    routes[line[inds[1] +1 : inds[2]]].append(line[inds[3] +1 : inds[4]])
    line = f.readline()

f.close()
airportdata['airports'] = airports
airportdata['routes'] = routes
print(airportdata['routes'])