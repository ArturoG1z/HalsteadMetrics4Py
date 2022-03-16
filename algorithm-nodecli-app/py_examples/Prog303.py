# PRÁCTICA 3 - PROGRAMA 3
# ÁLGEBRA: RESOLUCIÓN DE ECUACIONES LINEALES 2x2


print("programa 3x03 - ÁLGEBRA: RESOLUCIÓN DE ECUACIONES LINEALES 2x2")
print("aX + bY = c")
print("dX + eY = f")
print()

a = float(input("DAME EL VALOR DE a: "))
b = float(input("DAME EL VALOR DE b: "))
c = float(input("DAME EL VALOR DE c: "))
d = float(input("DAME EL VALOR DE d: "))
e = float(input("DAME EL VALOR DE e: "))
f = float(input("DAME EL VALOR DE f: "))

print()
if ((a * d - b * c) != 0):
    x = (e * d - b * f)/(a * d - b * c)
    y = (a * f - e * c)/(a * d - b * c)
    print("x es %.1f y y es %.1f" % (x, y))
else:
    print("Las ecuaciones no-tienen solución")

print()


