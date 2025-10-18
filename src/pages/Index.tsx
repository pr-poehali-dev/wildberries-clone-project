import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const CATEGORIES = [
  'Электроника',
  'Одежда',
  'Обувь',
  'Дом и сад',
  'Красота',
  'Детям',
  'Спорт',
  'Продукты'
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Беспроводные наушники',
    price: 3499,
    oldPrice: 4999,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 234,
    category: 'Электроника'
  },
  {
    id: 2,
    name: 'Стильная куртка',
    price: 5999,
    oldPrice: null,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 128,
    category: 'Одежда'
  },
  {
    id: 3,
    name: 'Кроссовки спортивные',
    price: 4299,
    oldPrice: 5999,
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 456,
    category: 'Обувь'
  },
  {
    id: 4,
    name: 'Умная колонка',
    price: 2999,
    oldPrice: null,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 189,
    category: 'Электроника'
  },
  {
    id: 5,
    name: 'Рюкзак городской',
    price: 1899,
    oldPrice: 2499,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 312,
    category: 'Аксессуары'
  },
  {
    id: 6,
    name: 'Набор посуды',
    price: 3299,
    oldPrice: null,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 267,
    category: 'Дом и сад'
  }
];

type Page = 'home' | 'catalog' | 'cart' | 'favorites' | 'profile' | 'orders';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCart = (id: number) => {
    setCartItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavoriteItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartProducts = PRODUCTS.filter(p => cartItems.includes(p.id));
  const favoriteProducts = PRODUCTS.filter(p => favoriteItems.includes(p.id));

  const totalCartPrice = cartProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground cursor-pointer" onClick={() => setCurrentPage('home')}>
              MarketHub
            </h1>

            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="search"
                  placeholder="Искать товары..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage('catalog');
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCurrentPage('favorites')}
              >
                <Icon name="Heart" size={22} className={favoriteItems.length > 0 ? 'fill-primary text-primary' : ''} />
                {favoriteItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {favoriteItems.length}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCurrentPage('cart')}
              >
                <Icon name="ShoppingCart" size={22} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage('profile')}
              >
                <Icon name="User" size={22} />
              </Button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative w-full">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="search"
                placeholder="Искать товары..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage('catalog');
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {currentPage === 'home' && (
        <main className="container mx-auto px-4 py-8 animate-fade-in">
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Распродажа недели</h2>
              <p className="text-lg text-muted-foreground mb-6">Скидки до 50% на популярные товары</p>
              <Button size="lg" onClick={() => setCurrentPage('catalog')}>
                Смотреть все товары
              </Button>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Категории</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {CATEGORIES.map((category) => (
                <Card
                  key={category}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 animate-scale-in"
                  onClick={() => setCurrentPage('catalog')}
                >
                  <CardContent className="p-6 text-center">
                    <p className="font-medium text-sm">{category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-6">Популярные товары</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.slice(0, 6).map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all animate-scale-in">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Icon
                          name="Heart"
                          size={20}
                          className={favoriteItems.includes(product.id) ? 'fill-primary text-primary' : ''}
                        />
                      </Button>
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold">{product.price} ₽</p>
                          {product.oldPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {product.oldPrice} ₽
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => toggleCart(product.id)}
                          variant={cartItems.includes(product.id) ? 'secondary' : 'default'}
                        >
                          {cartItems.includes(product.id) ? (
                            <Icon name="Check" size={18} />
                          ) : (
                            <Icon name="ShoppingCart" size={18} />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {currentPage === 'catalog' && (
        <main className="container mx-auto px-4 py-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Каталог товаров</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Icon
                        name="Heart"
                        size={20}
                        className={favoriteItems.includes(product.id) ? 'fill-primary text-primary' : ''}
                      />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h4 className="font-semibold mb-2">{product.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold">{product.price} ₽</p>
                        {product.oldPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {product.oldPrice} ₽
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => toggleCart(product.id)}
                        variant={cartItems.includes(product.id) ? 'secondary' : 'default'}
                      >
                        {cartItems.includes(product.id) ? (
                          <Icon name="Check" size={18} />
                        ) : (
                          <Icon name="ShoppingCart" size={18} />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'cart' && (
        <main className="container mx-auto px-4 py-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Корзина</h2>
          {cartProducts.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">Корзина пуста</p>
              <Button onClick={() => setCurrentPage('catalog')}>Перейти в каталог</Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4 flex gap-4">
                      <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{product.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                        <p className="text-lg font-bold">{product.price} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCart(product.id)}
                      >
                        <Icon name="Trash2" size={20} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Итого</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                        <span>{totalCartPrice} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Доставка</span>
                        <span className="text-green-600 font-medium">Бесплатно</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Итого:</span>
                        <span>{totalCartPrice} ₽</span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      )}

      {currentPage === 'favorites' && (
        <main className="container mx-auto px-4 py-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Избранное</h2>
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">Нет избранных товаров</p>
              <Button onClick={() => setCurrentPage('catalog')}>Перейти в каталог</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Icon name="Heart" size={20} className="fill-primary text-primary" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold">{product.price} ₽</p>
                          {product.oldPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {product.oldPrice} ₽
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => toggleCart(product.id)}
                          variant={cartItems.includes(product.id) ? 'secondary' : 'default'}
                        >
                          {cartItems.includes(product.id) ? (
                            <Icon name="Check" size={18} />
                          ) : (
                            <Icon name="ShoppingCart" size={18} />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      )}

      {currentPage === 'profile' && (
        <main className="container mx-auto px-4 py-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Профиль</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setCurrentPage('orders')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Мои заказы</h3>
                  </div>
                  <p className="text-muted-foreground">Просмотр и отслеживание заказов</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Адреса доставки</h3>
                  </div>
                  <p className="text-muted-foreground">Управление адресами</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="CreditCard" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Способы оплаты</h3>
                  </div>
                  <p className="text-muted-foreground">Сохранённые карты и счета</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Settings" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Настройки</h3>
                  </div>
                  <p className="text-muted-foreground">Управление аккаунтом</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'orders' && (
        <main className="container mx-auto px-4 py-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setCurrentPage('profile')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <h2 className="text-3xl font-bold">Мои заказы</h2>
            </div>
            <div className="text-center py-16">
              <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">У вас пока нет заказов</p>
              <Button onClick={() => setCurrentPage('catalog')}>Начать покупки</Button>
            </div>
          </div>
        </main>
      )}

      <footer className="bg-muted/50 mt-16 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Как сделать заказ</li>
                <li className="hover:text-foreground cursor-pointer">Способы оплаты</li>
                <li className="hover:text-foreground cursor-pointer">Доставка</li>
                <li className="hover:text-foreground cursor-pointer">Возврат товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">О нас</li>
                <li className="hover:text-foreground cursor-pointer">Вакансии</li>
                <li className="hover:text-foreground cursor-pointer">Партнёрам</li>
                <li className="hover:text-foreground cursor-pointer">Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Служба поддержки</li>
                <li className="hover:text-foreground cursor-pointer">FAQ</li>
                <li className="hover:text-foreground cursor-pointer">Гарантия</li>
                <li className="hover:text-foreground cursor-pointer">Обратная связь</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>8 800 000-00-00</li>
                <li>info@markethub.ru</li>
                <li>Ежедневно 9:00 — 21:00</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t pt-6">
            © 2024 MarketHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
