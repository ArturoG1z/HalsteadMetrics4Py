# PRÁCTICA 2 - PROGRAMA 2
# CALCULAR EL ÁREA DE UN TRIÁNGULO Y EL VOLUMEN DE UN PRISMA 

import math

print("programa 2x02 - CALCULAR EL ÁREA DE UN TRIÁNGULO Y EL VOLUMEN DE UN PRISMA")
print()
longitud = float(input("DAME LA LONGITUD DE LOS LADOS DEL TRIÁNGULO EQUILÁTERO, ASÍ COMO SU ALTURA: "))

area = (math.sqrt(3) * math.pow(longitud,2)) / 4.0
volumen = area * longitud

print("EL ÁREA DEL TRIÁNGULO ES: %.2f" % (area))
print("EL VOLUMEN DEL PRISMA ES: %.2f" % (volumen))
print()
