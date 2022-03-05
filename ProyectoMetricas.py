# Proyecto : Metricas de Haslted
# Elaborado por: Felipe Arturo Gonzalez Lopez
# Fecha: 26 de mayo de 2018

# PROPOSITOS DEL PROGRAMA: Calcular las metricas de Halsted de algun codigo implememtado en python

# IMPORTACION DE MODULOS
import math
import os
from decimal import Decimal


def remove_spaces(string):
  lista = ['\t', '\r', "\n"]
  string_without_spaces = string
  for i in range(len(lista)):
    string_without_spaces = string_without_spaces.replace(lista[i], '').strip()
  return string_without_spaces


def validaNumero():
  band = False
  while not band:
    n = input("")
    try:
      n = int(n)
      band = True
    except ValueError:
      print("Error: ingresa un numero entero")
      band = False
  return n


Operadores1 = ['"', "'", '(', '|', '^', '%', '&', ')',
               ':', '+', '*', '-', '/', '~', '=', '<', '>', ',', '.']
Operadores2 = ['+=', 'or', '/=', 'not in', '-=', '>>=', '^=', '<<=', '//', 'in',
               'is', '<=', '&=', '%=', '//=', '**', 'is not', 'not', '!=', '<<',
               '*=', '**=', '|=', '>=', '>>', '==', 'and', 'elif', 'is', 'pass',
               'while', 'as', 'in', 'if', 'from', 'raise', 'for', 'except', 'finally',
               'print', 'import', 'return', 'exec', 'else', 'break', 'not', 'with',
               'class', 'assert', 'yield', 'try', 'global', 'continue', 'del', 'or',
               'def', 'lambda', 'while', 'for', 'def', 'math', 'sqrt']
lenOperadores1 = len(Operadores1)
lenOperadores2 = len(Operadores2)
aux = [0]*lenOperadores1
aux2 = [0]*lenOperadores2
aux3 = [""]*1000
aux4 = [""]*1000
c = 0
i = 0
script_dir = os.path.dirname(__file__)

while(True):
  os.system('cls' if os.name == 'nt' else 'clear')
  print(
      "      PROGRAMA QUE CALCULA LAS METRICAS DE HALSTEAD\n""\n          [1]Calcular metricas\n""\n          [2]Salir\n")
  opcion = validaNumero()
  if(opcion == 1):
    os.system('cls' if os.name == 'nt' else 'clear')
    rel_path = (input(
        "  Ingresa el nombre del archivo fuente que deseas analizar, incluye extencion (.py) "))
    abs_file_path = os.path.join(script_dir, rel_path)
    archivo = open(abs_file_path, "rb")
    n1 = 0
    n2 = 0
    N2 = 0
    N1 = 0
    x = 0
    aux = [0]*lenOperadores1
    aux2 = [0]*lenOperadores2
    aux3 = [""]*1000
    aux4 = [""]*1000
    c = 0
    tam1 = len(Operadores1)
    tam2 = len(Operadores2)
    s1 = ''
    print("-------------------------------------------------------------------------------------")
    for bytes_in_line in archivo.readlines():
      line = bytes_in_line.decode("utf-8").rstrip('\'')
      line = remove_spaces(line)
      if (line == ""):
        continue
      print('**', line , '**')
      if (line[0] != '#'):
        if (aux[0] % 2 == 0 and aux[1] % 2 == 0):
          tam = len(line)
          i = 0
          while (i < (tam)):
            j = 0
            s1 = s1+line[i]
            s1 = s1.strip()
            while (j < (tam1)):
              if (line[i] == Operadores1[j]):
                N1 = N1+1
                aux[j] = aux[j]+1
                if (line[i] == ')'):
                  N1 = N1-1
                s1 = ''
                x = x+1
              j = j+1
            j = 0
            while j < (tam2):
              if (s1 == Operadores2[j]):
                N1 = N1+1
                aux2[j] = aux2[j]+1
                if (s1 == 'return'):
                  N1 = N1-1
                s1 = ''
              j = j+1
            uu = 0
            while (uu < tam1):
              if (s1 == Operadores1[uu]):
                s1 = ''
              uu = uu+1
            aux3[x] = s1
            i = i+1
          s1 = ''
          x = x+1

        j = 0
    while (j < tam1):
      if (Operadores1[j] == ')'):
        aux[j] = 0
      if (aux[j] != 0):
        n1 = n1+1.0
      j = j+1
    j = 0
    while (j < tam2):
      if (Operadores2[j] == 'return'):
        aux2[j] = 0
      if (aux2[j] != 0):
        n1 = n1+1.0
      j = j+1
    i = 0
    zz = len(aux3)
    while (i < zz):
      if (aux3[i] != ''):
        N2 = N2+1.0
      if (aux3[i] == ')'):
        N2 = N2-1.0
      if (aux3[i] == ':'):
        N2 = N2-1.0
      i = i+1
    n2 = N2
    i = 0
    rr = 0
    qq = 0
    while (i < zz):
      j = i
      tt = 0
      qq = 0
      while (qq < zz):
        if (aux3[i] == aux4[qq]):
          tt = 1
        qq = qq+1
      if (tt != 1):
        while (j < zz):
          if (aux3[i] == aux3[j] and aux3[i] != '' and i != j and aux3[i] != ')'):
            n2 = n2-1
          j = j+1
      aux4[rr] = aux3[i]
      rr = rr+1
      i = i+1
    print("-------------------------------------------------------------------------------------")
    ID = 1
    qq = 0
    float(N1)
    float(N2)
    float(n1)
    n2 = float(n2)
    n = n1+n2
    M = N1+N2
    V = (math.log(n, 2))*M
    gg = float(N2/n2)
    D = (n1/2)*gg
    L = 1/D
    E = V*D
    T = E/18
    fraccion = (float(2)/float(3))
    B = (math.pow(E, fraccion))/3000

    N1 = round(Decimal(N1), 2)
    N2 = round(Decimal(N2), 2)
    n1 = round(Decimal(n1), 2)
    n2 = round(Decimal(n2), 2)
    n = round(Decimal(n), 2)
    M = round(Decimal(M), 2)
    D = round(Decimal(D), 2)
    L = round(Decimal(L), 4)
    E = round(Decimal(E), 2)
    T = round(Decimal(T), 3)
    B = round(Decimal(B), 4)
    V = round(Decimal(V), 2)

    print("No. Operadores: ", n1)
    print("Total de Operadores: ", N1)
    print("No. Operandos: ", n2)
    print("Total de Operandos: ", N2)
    print("Longitud del Programa: ", M)
    print("Vocabulario del Programa: ", n)
    print("Volumen: ", V, "(BITS)")
    print("Dificultad: ", D)
    print("Nivel: ", L)
    print("Esfuerzo: ", E)
    print("Tiempo: ", T, "(SEGUNDOS)")
    print("Bugs: ", B)
    print("")
    input()
    n1 = 0
    n2 = 0
    N1 = 0
    N2 = 0
  if opcion == 2:
    break

print("\nFin de la ejecucuion...")
input()
