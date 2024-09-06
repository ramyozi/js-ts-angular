import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';
import {ProductEditComponent} from "../product-edit/product-edit.component";
import { Modal } from "bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule, ProductEditComponent],
  templateUrl: './product-get.component.html',
  styleUrl: './product-get.component.css',
})

export class ProductGetComponent {
  products: ProductInterface[] = [];
  selectedProductId: string | undefined = undefined;
  showModal: boolean = false;
  modalType: 'update' | 'delete' | null = null;
  productToDelete: ProductInterface | undefined = undefined;

  constructor(private productsService: ProductsService, private router: Router) {}
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('liste des produits chargées avec succès:', products);
        this.products = products;
      },
      error: (error) => {
        console.error(
          `Erreur lors de la récupération de la liste des produits :`,
          error
        );
      },
    });
  }

  handleDeleteProduct(id: string) {
    this.productToDelete = this.products.find(product => product.id === id);
    this.modalType = 'delete';
    this.showModal = true;
  }

  confirmDelete() {
    if (this.productToDelete) {
      this.productsService.deleteProduct(this.productToDelete.id).subscribe({
        next: (product) => {
          console.log('Produit supprimé avec succès:', product);
          this.products = this.products.filter((p) => p.id !== this.productToDelete!.id);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du produit:', error);
        }
      });
    }
  }

  handleUpdateProduct(id: string) {
    this.selectedProductId = id;
    this.modalType = 'update';
    this.showModal = true;
  }

  onUpdateComplete() {
    this.loadProducts();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedProductId = undefined;
    this.modalType = null;
    this.productToDelete = undefined;
  }

  addRandomProduct() {
    const name = Math.random().toString(36).substring(7);
    const randomProduct: ProductInterface = {
      id: Date.now().toString(),
      name: `Produit ${name}`,
      description: `Description du produit ${name}`,
      price: Math.random() * 100,
    };
    this.products.push(randomProduct);
    this.productsService.addProduct(randomProduct).subscribe({
      next: (product) => {
        console.log('Produit ajouté avec succès:', product);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
        this.products.pop();
      }
    });
  }
}
