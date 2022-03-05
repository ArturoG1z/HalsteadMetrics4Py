# PRÁCTICA 3 - PROGRAMA 1
# ÁLGEBRA: RESOLUCIÓN DE ECUACIONES CUADRÁTICAS

import math

print("programa 3x01 - ÁLGEBRA: RESOLUCIÓN DE ECUACIONES CUADRÁTICAS")
print()

a = float(input("DAME EL VALOR DE a: "))
b = float(input("DAME EL VALOR DE b: "))
c = float(input("DAME EL VALOR DE c: "))

disc = math.pow(b, 2) - 4 * a * c

print()

if (disc > 0):
    r1 = (- b + math.sqrt(disc)) / (2 * a)
    r2 = (- b - math.sqrt(disc)) / (2 * a)
    print("La ecuación tiene dos raíces: %f y %f" % (r1, r2))
elif (disc == 0):
    r = (- b) / (2 * a)
    print("La ecuación tiene una raíz: %f" % (r))
else:
    print("La ecuación no-tiene raíces reales")

print()

