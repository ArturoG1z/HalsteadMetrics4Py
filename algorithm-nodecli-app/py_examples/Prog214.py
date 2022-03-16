# PRÁCTICA 2 - PROGRAMA 14
# APLICACIÓN DE LA SALUD: ÍNDICE DE MASA CORPORAL 


print("programa 2x14 - APLICACIÓN DE LA SALUD: ÍNDICE DE MASA CORPORAL")
print()

pesoLibras = float(input("DAME TU PESO EN libras: "))
estaturaPulgadas = float(input("DAME TU ESTATURA EN pulgadas: "))

pesoKilogramos = 0.45359237 * pesoLibras
estaturaMetros = 0.0254 * estaturaPulgadas

IMC = pesoKilogramos / estaturaMetros ** 2

print("Tu Índice de Masa Corporal (IMC) es: %f" % (IMC))

print()

