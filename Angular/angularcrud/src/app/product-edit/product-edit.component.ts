import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import {
  NewProductInterface,
  ProductInterface,
} from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})

export class ProductEditComponent implements OnChanges {

  @Input() productId!: string;
  @Output() updateComplete = new EventEmitter<void>();

  product!: ProductInterface | null;
  productForm!: FormGroup;
  isSubmitted = false;
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    if (this.productId) {
      this.loadProduct();
    }
  }

  loadProduct() {
    this.productsService.loadOneProduct(this.productId).subscribe({
      next: (product) => {
        console.log('produit chargé avec succès:', product);
        this.product = product;
        this.productForm = this.fb.group({
          name: [this.product.name, Validators.required],
          description: [this.product.description],
          price: [this.product.price, [Validators.required, Validators.min(0)]],
        });
      },
      error: (error) => {
        console.error(`Erreur lors de la récupération du produit :`, error);
      },
    });
  }

  register() {
    this.isSubmitted = true;
    console.log(`Dans register de product edit `);
    if (this.productForm.valid) {
      const upProduct: NewProductInterface = this.productForm.value;
      console.log(`Modification du produit`, upProduct);

      if (this.product && this.product.id) {
        this.productsService.patchProduct(this.product.id, upProduct).subscribe({
          next: (response) => {
            console.log('Produit modifié avec succès:', response);
            this.productForm.reset();
            this.isSubmitted = false;
            this.updateComplete.emit();  // Emit event to notify parent to refresh list
          },
          error: (error) => {
            console.error(`Erreur lors de la modification du produit:`, error);
          },
        });
      }
    } else {
      console.log(`Problème lors de l'ajout du formulaire`);
    }
  }
}
