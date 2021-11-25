import { Router } from 'express';
import AuthRoutes from './auth.routes'
import ProductsRoutes from './products.routes';
import BrandsRoutes from './brands.routes';
import ModelsRoutes from './models.routes';
import OrdersRoutes from "./orders.routes";
import PaypalRoutes from "./paypal.routes";
import router from './auth.routes';


let routes = Router();
routes.use("/auth", AuthRoutes);
routes.use("/products", ProductsRoutes);
routes.use("/brands", BrandsRoutes);
routes.use("/models", ModelsRoutes);
routes.use("/orders", OrdersRoutes);
routes.use("/paypal", PaypalRoutes);

export { routes };