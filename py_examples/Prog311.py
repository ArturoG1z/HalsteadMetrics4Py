# PRÁCTICA 3 - PROGRAMA 11
# ENCONTRAR EL NÚMERO DE DÍAS DE UN MES


print("programa 3x11 - ENCONTRAR EL NÚMERO DE DÍAS DE UN MES")
print()

mes = int(input("DAME EL NÚMERO DEL MES: "))
ano = int(input("DAME EL NÚMERO DEL AÑO: "))

diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
         "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

if (ano % 4 == 0 and mes == 2):
    dias = 29
else:
    dias = diasMes[mes-1]

nombreMes = meses[mes-1]

print()
print("%s DE %d TIENE %d DÍAS" % (nombreMes, ano, dias))
print()

