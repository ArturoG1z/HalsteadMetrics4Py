# PRÁCTICA 3 - PROGRAMA 8
# ORDENAR TRES NÚMEROS ENTEROS


print("programa 3x08 - ORDENAR TRES NÚMEROS ENTEROS")
print()

x = int(input("DAME EL PRIMER NÚMERO: "))
y = int(input("DAME EL SEGUNDO NÚMERO: "))
z = int(input("DAME EL TERCER NÚMERO: "))

if (x < y):
    if (x < z):
        uno = x
        if (y < z):
            dos = y
            tres = z
        else:
            dos = z
            tres = y
    else:
        uno = z
        dos = x
        tres = y
else:
    if (y < z):
        uno = y
        if (x < z):
            dos = x
            tres = z
        else:
            dos = z
            tres = y
    else:
        uno = z
        dos = y
        tres = x

print()
print("LOS NÚMEROS ORDENADOS SON: %d, %d y %d" % (uno, dos, tres))
print()

