filepath = 'b.txt'
f = open(filepath, "r", encoding="utf8")
line = f.readline()

set = {'a'}
while line:
    set.add(line[0:len(line)-1])
    line = f.readline()

set.remove('a')
print(set)
f.close()
