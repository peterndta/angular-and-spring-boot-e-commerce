import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')
    // check nếu có keyword trên params nghĩa là đang search -> gọi handleSearchProduct()
    if(this.searchMode){
      this.handleSearchProducts()
    } else {
      this.handleListProducts()
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // search product với keyword vừa tìm
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){
    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if(hasCategoryId){
      // get the "id" param string, và convert string thành number với + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // dấu ! để báo cho compiler object không null
    } else {
      // không có cate id thi default cate sẽ là 1
      this.currentCategoryId = 1;
    }

    // lấy products cho cate id tương ứng
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
