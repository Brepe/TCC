import { ProviderProvider } from '../provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-editarevento',
  templateUrl: 'editarevento.html',
})
export class EditareventoPage {
  title: string;
  form: FormGroup;
  contact: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProviderProvider,
    private toast: ToastController) {

    // maneira 1
    this.contact = this.navParams.data.contact || { };
    this.createForm();

    // // maneira 2
    // this.contact = { };
    // this.createForm();

    // if (this.navParams.data.key) {
    //   const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
    //     subscribe.unsubscribe();

    //     this.contact = c;
    //     this.createForm();
    //   })
    // }

    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.$key],
      timeEnds: [this.contact.timeEnds],
      event: [this.contact.event, Validators.required],
      description: [this.contact.description, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}