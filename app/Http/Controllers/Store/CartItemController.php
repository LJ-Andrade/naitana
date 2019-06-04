<?php

namespace App\Http\Controllers\Store;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CartItem;
use App\Cart;
use App\CatalogArticle;
use App\CatalogVariant;
use App\Traits\CartTrait;
use Session;

class CartItemController extends Controller
{
    use CartTrait;

    public function store(Request $request)
    {   
        
        $anonCustomer = !auth()->guard('customer')->check(); 
        // $combination = $request->size_id;
        // Find article
        $article = CatalogArticle::where('id', $request->article_id)->first();
        // Find variant
        $variant = CatalogVariant::where('article_id', $request->article_id)->where('color_id', $request->color_id)->where('size_id', $request->size_id)->first();
        $existingCartItem = NULL;      
        
        if(!$anonCustomer)
        {   
            // REGISTERED CUSTOMER
            $activeCartId = auth()->guard('customer')->user()->cart->id; // This comes from Customer Model getCartAttribute()
            $customerGroup = auth()->guard('customer')->user()->group;
            // Check if variant is already stored as cartItem
            $existingCartItem = CartItem::where('cart_id', $activeCartId)->where('variant_id', $variant->id)->first();
        } 
        else
        {
            // ANON CUSTOMER
            $customerGroup = '2';
            $sessionId = $request->session()->getId();
            
            // Check if an active anon cart exist with session Id
            $activeCart = Cart::where('anon_token', $sessionId)->where('status', 'Active')->first();
            if($activeCart)
            {
                $activeCartId = $activeCart->id;
                $existingCartItem = CartItem::where('cart_id', $activeCartId)->where('variant_id', $variant->id)->first();
            }
            // If not create a new anon cart
            else
            {
                $cart = new Cart();
                $cart->status = 'Active';
                $cart->customer_id = NULL;
                $cart->anon_token = $request->session()->getId();
                $cart->save();
                $request->session()->put('activeCart', $cart);
                $activeCartId = $cart->id;
            }
        }
        
        if(!$existingCartItem)
        {
            // Create New Cart Item
            $cartItem = new CartItem();
            $cartItem->cart_id = $activeCartId;
            $cartItem->article_id = $request->article_id;
            $cartItem->variant_id = $variant->id;
            $cartItem->quantity = $request->quantity;
            
            if(!$variant)
            return response()->json(['response' => 'warning', 'message' => 'No se ha encontrado la variante']); 
            
            // Stock management 
            if($request->quantity > $variant->stock)
                return response()->json(['response' => 'warning', 'message' => 'Seleccionó una cantidad mayor al stock disponible']);
            
            // Calc Item Price   
            if($customerGroup == '3')
                $cartItem->final_price = $this->calcArticlePrice($article->reseller_price, $article->reseller_discount);
            else
                $cartItem->final_price = $this->calcArticlePrice($article->price, $article->discount);

            $cartItem->article_name = $article->name;
            $cartItem->combination = $variant->color->name.'/'.$variant->size->name;
            $cartItem->color = $variant->color->name;
            $cartItem->size = $variant->size->name;
            $cartItem->textile = $article->textile;
            
            try
            {
                $cartItem->save();
                // Discount Stock
                // * Note the minus (-) sign in $request->quantity
                $newStock = $this->updateVariantStock($variant->id, -$request->quantity);
                return response()->json(['response' => 'success', 'newStock' => $newStock, 'message' => 'Producto "'. $article->name .'" agregado']); 
            } 
            catch (\Exception $e) 
            {
                return response()->json(['response' => 'error', 'message' => $e->getMessage()]); 
            }
        }
        else
        {   
            // Update existing CartItem

            // Stock management 
            if($request->quantity > $variant->stock)
                return response()->json(['response' => 'warning', 'message' => 'Seleccionó una cantidad mayor al stock disponible']); 
            
            // Discount Stock
            // * Note the minus (-) sign in $request->quantity
            // Update existing Cart Item
            $existingCartItem->quantity += $request->quantity;
            
            try
            {
                $existingCartItem->save();
                $newStock = $this->updateVariantStock($variant->id, -$request->quantity);
                return response()->json(['response' => 'success', 'newStock' => $newStock, 'message' => 'Producto "'. $existingCartItem->article->name .'" agregado']); 
            } 
            catch (\Exception $e) 
            {
                return response()->json(['response' => 'error', 'message' => $e->getMessage()]); 
            }
        }      
    }


    public function addQtoCartItem(Request $request)
    {
        $cartItem = CartItem::findOrFail($request->itemId);
        
        if($request->quantity == $cartItem->quantity)
        {
            return redirect()->back();
        }
        elseif($request->quantity > ($cartItem->article->stock + $cartItem->quantity))
        {   
            return redirect()->back()->with('message', 'Stock actual excedido');
        }

        try
        {
            $value = $cartItem->article->stock - $request->quantity + $cartItem->quantity;
            $this->replaceCartItemStock($cartItem->article->id, $value);
            
            $cartItem->quantity = $request->quantity;
            $cartItem->save();
    
            return redirect()->back()->with('message', 'Cantidad modificada');
        }
        catch (\Exception $e) 
        {
            dd($e);
            return redirect()->back()->with('message', $e->getMessage());
        }
    }

    public function destroy(Request $request)
    {
        $item = CartItem::where('id', $request->cartItemId)->first();
        try
        {
            // Return Stock
            $item->delete();
            $this->updateVariantStock($request->variantId, $request->quantity);
        } 
        catch (\Exception $e) 
        {
            dd($e->getMessage());
            return redirect()->back()->with('message', 'Error al eliminar. '. $e->getMessage());
        }
        // If last article is deleted also delete activecart
        $cart = Cart::findOrFail($item->cart->id);
        if($cart->items->count() < 1)
        {
            $cart->delete();
            if(isset($request->action) && $request->action == 'reload')
            {
                return response()->json(['response' => 'cart-removed', 'message' => 'Carro de compras eliminado']); 
            }
            else 
            {
                return redirect('tienda')->with('message', 'Carro de compras eliminado');
            }
        } 
        else 
        {
            if(isset($request->action) && $request->action == 'reload')
            {
                return response()->json(['response' => 'success', 'message' => 'Artículo eliminado del carro de compras']); 
            }
            else 
            {
                return redirect('tienda')->with('message', 'Carro de compras eliminado');
            }
            return redirect()->back()->with('message', 'Artículo eliminado');
        }
    }
}


