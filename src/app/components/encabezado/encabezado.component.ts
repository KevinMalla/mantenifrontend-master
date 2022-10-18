import { Component, OnInit } from '@angular/core';
import { EncabezadoService } from 'src/app/services/encabezado/encabezado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Operario/Usuario';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  user: Usuario = {
    Planta: 0,
    Codigo: "",
    Password: ""
  }

  nueva: boolean = false // Boolean que disctará si es necesario desplegar formulario para la nueva contraseña

  plantas!: any[];
  numPlanta: string = "";
  nombre!: string;
  tipo!: number;
  login: boolean = false;
  pedirContrasenia: Boolean = false

  form: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  constructor(
    private encabezadoService: EncabezadoService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      planta: ['', Validators.required],
      trabajador: ['', Validators.required],
      password: ['']
    });

    this.form2 = formBuilder.group({
      password1: [''],
      password2: ['']
    });

  }

  ngOnInit(): void {
    this.selectAllPlantas(); //Carga el desplegable
    /**Si se ha realizado el login pidiendo contrasña cargara el usuario, en caso contrario volverá a cargar como trabajador */
    if (localStorage.getItem('conClave') == "true") {
      this.numPlanta = String(localStorage.getItem('plantaMantenimiento'))
      this.selectUsuario(String(localStorage.getItem('trabajadorMantenimiento')));
    } else if (localStorage.getItem('conClave') == "false") {
      this.selectTrabajador(Number(localStorage.getItem('plantaMantenimiento')), String(localStorage.getItem('trabajadorMantenimiento')))
    }
  }

  /**Get para los formularios de login y de cambio de contraseña */
  /** Login*/
  get planta(): any {
    return this.form.get('planta')?.value
  }
  get trabajador(): any {
    return this.form.get('trabajador')?.value
  }
  get password(): any {
    return this.form.get('password')?.value
  }
  /**Cambio de contraseña */
  get password1(): any {
    return this.form2.get('password1')?.value
  }
  get password2(): any {
    return this.form2.get('password2')?.value
  }


  /**Obtiene las plantas para el desplegable*/
  selectAllPlantas() {
    this.encabezadoService.getPlanta().subscribe(
      res => this.plantas = res,
      err => console.error(err)
    )
  }
  /**Obtiene los datos de la tabla trabajador*/
  selectTrabajador(planta: number, trabajador: string) {
    this.encabezadoService.selectOne(planta, trabajador).subscribe(
      res => {
        this.login = true;
        this.nombre = res.Nombre;
        this.tipo = 3
        localStorage.setItem('logMantenimiento', 'true')
        localStorage.setItem('plantaMantenimiento', planta.toString())
        localStorage.setItem('trabajadorMantenimiento', trabajador)
        localStorage.setItem('conClave', 'false')
        localStorage.setItem('tipoUsuario', '3')
      },
      err => {
        console.error(err)
        this.snackBar.open(err.error.message, "", ({
          duration: 2000
        }))
      });
  }
  /**Obtiene los datos de la tabla usuario, este método actua cuando se recarga la página o al inicio cuando encuentra en el local storage una variable con el codigo de usuario*/
  selectUsuario(trabajador: string) {
    this.encabezadoService.selectUser(trabajador).subscribe(
      res => {
        this.login = true;
        this.nombre = res.Nombre;
        this.tipo = res.TipoUsuario
        localStorage.setItem('logMantenimiento', 'true')
        localStorage.setItem('plantaMantenimiento', this.numPlanta)
        localStorage.setItem('trabajadorMantenimiento', trabajador)
        localStorage.setItem('conClave', 'true')
        localStorage.setItem('tipoUsuario', res.TipoUsuario)
      },
      err => {
        console.error(err)
        this.snackBar.open(err.error.message, "", ({
          duration: 2000
        }))
      }
    )
  }
  /**Verifica si existe usuario, si existe pedirá contraseña para continuar, en caso contrario entrara como trabajador*/
  async verificarUsuario(codigo: string) {
    const promise = await this.encabezadoService.selectUser(codigo).toPromise();
    if (promise) {
      this.pedirContrasenia = true;      
      document.getElementById("iniciar")!.style.display = "none";
    }
    else {
      this.selectTrabajador(this.planta, codigo)
    }
  }

  /** Método para hacer login cuando es usuario*/
  signin(trabajador: string, password: string) {
    if (password) {
      this.encabezadoService.login(trabajador, password).subscribe(
        res => {
          if (res.Codigo) {
            this.login = true;
            this.nombre = res.Nombre;
            this.tipo = res.TipoUsuario
            localStorage.setItem('logMantenimiento', 'true')
            localStorage.setItem('plantaMantenimiento', this.planta)
            localStorage.setItem('trabajadorMantenimiento', trabajador)
            localStorage.setItem('conClave', 'true')
            localStorage.setItem('tipoUsuario', res.TipoUsuario)
          }else{
            this.snackBar.open("No se ha encontrado el usuario", "", {duration:2000})
          }
        },
        err => {
          console.error(err)
          this.snackBar.open(err.error.message, "", ({
            duration: 2000
          }))
        })
    } else {
      this.snackBar.open("Introduzca la contraseña", "", { duration: 2000 })
    }
  }

  /**Verifica que se hayan rellenado los campos de Planta y Codigo de operario, una vez validado se iniciará el proceso*/
  iniciar() {
    this.numPlanta = this.planta
    if (this.form.valid) {
      this.verificarUsuario(this.trabajador)
    } else {
      this.snackBar.open("Rellene todos los campos", "", { duration: 2000 })
    }
  }

  /**Log out*/
  cerrar() {
    this.login = false;
    localStorage.setItem('logMantenimiento', 'false')
    this.planta == null
    localStorage.removeItem('plantaMantenimiento')
    localStorage.removeItem('trabajadorMantenimiento')
    localStorage.removeItem('conClave')
    localStorage.removeItem('tipoUsuario')
    this.pedirContrasenia = false;
  }

  /**Método para cambiar la contraseña de los registros de la tabla de usuario */
  changePassword() {
    /**Verifica que se haya introducido los campos */
    if (this.password1 == '' || this.password2 == '') { return; }
    if (this.trabajador == '') {
      this.snackBar.open("Introduce el código del trabajador", "", { duration: 2000 })
      return;
    }

    /**Envía al backend el código de usuario y el usuario  */
    if (this.password1 == this.password2) {
      this.user.Planta = this.planta
      this.user.Codigo = this.trabajador
      this.user.Password = this.password1
      
      this.encabezadoService.changePassword(String(this.user.Codigo), this.user).subscribe(
        res => {
          this.snackBar.open(res.message, "", { duration: 2000 })
          this.nueva = false
        }
      )
    }
  }
}