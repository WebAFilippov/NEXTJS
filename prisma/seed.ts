import { hashSync } from 'bcrypt'
import { prisma } from './prisma-client'
import { Prisma } from '@prisma/client'

const slugify = (text: string) => {
  const translitDict: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => translitDict[char] || '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const generateProductVariant = ({
  productId,
  price,
  imageUrl,
  size,
  type,
}: {
  productId: number
  price: number
  imageUrl: string
  size?: string
  type?: string
}) => {
  return {
    productId,
    price,
    imageUrl,
    size,
    type,
  } as Prisma.ProductVariantUncheckedCreateInput
}

const generateDetailInfo = ({
  productVariantId,
  energy,
  protein,
  fats,
  carbohydrate,
  weight,
}: {
  productVariantId: number
  energy?: number
  protein?: number
  fats?: number
  carbohydrate?: number
  weight?: number
}) => {
  return {
    productVariantId,
    energy,
    protein,
    fats,
    carbohydrate,
    weight,
  } as Prisma.DetailInfoProductUncheckedCreateInput
}
const generateIngredients = async ({
  productVariantId,
  name,
  price,
  imageUrl,
}: {
  productVariantId: number[]
  name: string
  price: number
  imageUrl: string
}) => {
  await prisma.ingredient.create({
    data: {
      name,
      price,
      imageUrl,
      productVariant: { connect: productVariantId.map((productId) => ({ id: productId })) },
    },
  })
}

const up = async () => {
  // create Users
  await prisma.user.createMany<Prisma.UserCreateManyArgs>({
    data: [
      {
        fullName: 'Alex',
        email: 'user@a.com',
        password: hashSync('11111111', 10),
        role: 'USER',
        verified: new Date(),
      },
      {
        fullName: 'Admin',
        email: 'admin@a.com',
        password: hashSync('11111111', 10),
        role: 'ADMIN',
        verified: new Date(),
      },
    ],
    skipDuplicates: true,
  })

  // create Categories
  await prisma.category.createMany<Prisma.CategoryCreateManyArgs>({
    data: [
      {
        name: 'Завтрак',
      },
      {
        name: 'Пиццы',
      },
      {
        name: 'Закуски',
      },
      {
        name: 'Коктейли',
      },
      {
        name: 'Кофе',
      },
      {
        name: 'Напитки',
      },
      {
        name: 'Десерты',
      },
      {
        name: 'Соусы',
      },
      {
        name: 'Другие товары',
      },
    ],
    skipDuplicates: true,
  })

  // create Products
  const createProducts = async () => {
    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }] },
        name: 'Омлет с ветчиной и грибами',
        slug: slugify('Омлет с ветчиной и грибами'),
        description: 'Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }] },
        name: 'Омлет с беконом',
        slug: slugify('Омлет с беконом'),
        description:
          'Классическое сочетание горячего омлета с поджаристой корочкой и бекона с добавлением моцареллы и томатов на завтрак',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 2 }] },
        name: 'Мясная с аджикой',
        slug: slugify('Мясная с аджикой'),
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 2 }] },
        name: 'Аррива!',
        slug: slugify('Аррива!'),
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 3 }] },
        name: 'Дэнвич ветчина и сыр',
        slug: slugify('Дэнвич ветчина и сыр'),
        description:
          'Поджаристая чиабатта и знакомое сочетание ветчины, цыпленка, моцареллы со свежими томатами, соусом ранч и чесноком',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 3 }] },
        name: 'Супермясной Додстер',
        slug: slugify('Супермясной Додстер'),
        description:
          'Горячая закуска с цыпленком, моцареллой, митболами, острыми колбасками чоризо и соусом бургер в тонкой пшеничной лепешке',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 4 }] },
        name: 'Молочный коктейль Пина Колада',
        slug: slugify('Молочный коктейль Пина Колада'),
        description: 'Тропическое сочетание кокоса и ананаса в нежном милкшейке',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }, { id: 4 }] },
        name: 'Шоколадный молочный коктейль',
        slug: slugify('Шоколадный молочный коктейль'),
        description:
          'Очаровательная шоколадная нежность. Попробуйте молочный коктейль с какао и мороженым',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }, { id: 5 }] },
        name: 'Кофе Латте',
        slug: slugify('Кофе Латте'),
        description: 'Когда хочется нежную молочную пенку, на помощь приходит классический латте',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }, { id: 5 }] },
        name: 'Айс Капучино',
        slug: slugify('Айс Капучино'),
        description:
          'Освежающий напиток для любителей кофе. В составе эспрессо, пломбир, молоко и бодрость на весь день',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }, { id: 6 }] },
        name: 'Какао',
        slug: slugify('Какао'),
        description: 'Отправляемся в сладкое плавание в хорошей компании — горячее какао с молоком',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 6 }] },
        name: 'Морс Черная смородина',
        slug: slugify('Морс Черная смородина'),
        description:
          'Для усиления ощущений от морса рекомендуем закрыть глаза и представить себя у бабушки в саду. Дизайн товара может отличаться',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 7 }] },
        name: 'Сорбет Лимонный фреш',
        slug: slugify('Сорбет Лимонный фреш'),
        description: 'Цитрусовая свежесть в стаканчике. Сладкий вкус с приятной кислинкой',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 1 }, { id: 7 }] },
        name: 'Сырники с малиновым вареньем',
        slug: slugify('Сырники с малиновым вареньем'),
        description:
          'Любимый десерт многих наших гостей — румяные сырники из печи. Такие нежные, в меру сладкие и напоминающие детство',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 8 }] },
        name: 'Медово-Горчичный',
        slug: slugify('Медово-Горчичный'),
        description:
          'Фирменный медово-горчичный соус со жгучей сладостью для бортиков пиццы и горячих закусок',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 8 }] },
        name: 'Кетчуп',
        slug: slugify('Кетчуп'),
        description:
          'Фирменный кетчуп с насыщенным томатным вкусом для бортиков пиццы и горячих закусок',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 9 }] },
        name: 'Додо Клюв',
        slug: slugify('Додо Клюв'),
        description: 'Если хочется перевоплощения',
      },
    })

    await prisma.product.create({
      data: {
        category: { connect: [{ id: 9 }] },
        name: 'Додо Колпак',
        slug: slugify('Додо Колпак'),
        description: 'Цвета разные, а эмоции одни – все варианты на высоте',
      },
    })
  }
  await createProducts()

  // create DefaultVariants for Pizza
  await prisma.defaultIngredient.createMany<Prisma.DefaultIngredientCreateManyArgs>({
    data: [
      {
        productId: 3,
        name: 'Баварские колбаски',
      },
      {
        productId: 3,
        name: 'острый соус аджика',
      },
      {
        productId: 3,
        name: 'острые колбаски чоризо',
      },
      {
        productId: 3,
        name: 'цыпленок',
      },
      {
        productId: 3,
        name: 'пикантная пепперони',
      },
      {
        productId: 3,
        name: 'моцарелла',
      },
      {
        productId: 3,
        name: 'фирменный томатный соус',
      },
      {
        productId: 4,
        name: 'Цыпленок',
      },
      {
        productId: 4,
        name: 'острые колбаски чоризо',
      },
      {
        productId: 4,
        name: 'соус бургер',
      },
      {
        productId: 4,
        name: 'сладкий перец',
      },
      {
        productId: 4,
        name: 'красный лук',
      },
      {
        productId: 4,
        name: 'томаты',
      },
      {
        productId: 4,
        name: 'моцарелла',
      },
      {
        productId: 4,
        name: 'соус ранч',
      },
      {
        productId: 4,
        name: 'чеснок',
      },
    ],
    skipDuplicates: true,
  })

  // create ProductVariants
  await prisma.productVariant.createMany<Prisma.ProductVariantCreateManyArgs>({
    data: [
      generateProductVariant({
        productId: 1,
        price: 169,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7970321044479C1D1085457A36EB.avif',
        type: '1шт',
      }),
      generateProductVariant({
        productId: 2,
        price: 169,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7970326512C89366583FF997CA9E.avif',
        type: '1шт',
      }),
      generateProductVariant({
        productId: 3,
        price: 469,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EF438E8FA58DA88AC1B2370F02A4D4.avif',
        size: 'Маленькая',
        type: 'Традиционное',
      }),
      generateProductVariant({
        productId: 3,
        price: 719,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EF438E93884BFEBFE79D11095AE2D4.avif',
        size: 'Средняя',
        type: 'Традиционное',
      }),
      generateProductVariant({
        productId: 3,
        price: 799,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EF438E9DE514FB9742C94B62F9AA66.avif',
        size: 'Большая',
        type: 'Традиционное',
      }),
      generateProductVariant({
        productId: 3,
        price: 719,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EF438E97880C0C920ED1A2598FE231.avif',
        size: 'Средняя',
        type: 'Тонкое',
      }),
      generateProductVariant({
        productId: 3,
        price: 799,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EF438EA343456FB16B54CE02FE67E6.avif',
        size: 'Большая',
        type: 'Тонкое',
      }),
      generateProductVariant({
        productId: 4,
        price: 469,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D61348C54F1A0F9480B86AFBAD3.avif',
        size: 'Маленькая',
        type: 'Традиционное',
      }),
      generateProductVariant({
        productId: 4,
        price: 719,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D6134BC4150BDD8E792D866AB52.avif',
        size: 'Средняя',
        type: 'Традиционное',
      }),
      generateProductVariant({
        productId: 4,
        price: 799,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D613520824982DD0940AD0D58AB.avif',
        size: 'Большая',
        type: 'Традиционное',
      }),
      generateProductVariant({
        productId: 4,
        price: 719,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D6134EE6EC3A31A3AAEFB0C4860.avif',
        size: 'Средняя',
        type: 'Тонкое',
      }),
      generateProductVariant({
        productId: 4,
        price: 799,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D61354E6E9E9C1886D96EF9F54A.avif',
        size: 'Большая',
        type: 'Тонкое',
      }),
      generateProductVariant({
        productId: 5,
        price: 229,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE796FF0059B799A17F57A9E64C725.avif',
        type: '1шт',
      }),
      generateProductVariant({
        productId: 6,
        price: 209,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE797022F9AD72AC34E1B01DC6AEBA.avif',
        type: '1шт',
      }),
      generateProductVariant({
        productId: 7,
        price: 215,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EEA69C98929AD79D1ADB5EF4CF22BB.avif',
        type: '0,3 л',
      }),
      generateProductVariant({
        productId: 8,
        price: 215,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE796FA24D1E919FA050D8BA21F8E9.avif',
        type: '0,3 л',
      }),
      generateProductVariant({
        productId: 9,
        price: 149,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D61B0C26A3F85D97A78FEEE00AD.avif',
        type: '0,4 л',
      }),
      generateProductVariant({
        productId: 10,
        price: 199,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EEFB6985E52B9FA2C985EBC42C7E64.avif',
        type: '0,3 л',
      }),
      generateProductVariant({
        productId: 11,
        price: 119,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE79702DC5EA0EBF92E2483DB89B11.avif',
        type: '0,3 л',
      }),
      generateProductVariant({
        productId: 12,
        price: 125,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EECF750FD6B61AAC7BF1E2A8935DE2.avif',
        type: '0,45 л',
      }),
      generateProductVariant({
        productId: 13,
        price: 125,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EF02702EEF6FD9BB2AB771DB0535BD.avif',
        type: '1 шт',
      }),
      generateProductVariant({
        productId: 14,
        price: 295,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE7D61B7DE873C82A72DB3BE601BD4.avif',
        type: '4 шт',
      }),
      generateProductVariant({
        productId: 15,
        price: 40,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EEF6672F76A11586BEB5B904E2BC44.avif',
        type: '1 шт',
      }),
      generateProductVariant({
        productId: 16,
        price: 40,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE797031797972814244D8CAEC44FE.avif',
        type: '1 шт',
      }),
      generateProductVariant({
        productId: 17,
        price: 10,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE796FB007067EB2AEE8DDC23E8BBE.avif',
        type: '1 шт',
      }),
      generateProductVariant({
        productId: 18,
        price: 10,
        imageUrl:
          'https://media.dodostatic.net/image/r:760x760/11EE796FA8B9B8E3828E5FDBDEF24A39.avif',
        type: '1 шт',
      }),
    ],
    skipDuplicates: true,
  })

  // create DetailInfo for ProductVariant
  await prisma.detailInfoProduct.createMany<Prisma.DetailInfoProductCreateManyArgs>({
    data: [
      generateDetailInfo({
        productVariantId: 1,
        energy: 197.3,
        protein: 15.4,
        fats: 13.9,
        carbohydrate: 1.1,
        weight: 110,
      }),
      generateDetailInfo({
        productVariantId: 2,
        energy: 253.7,
        protein: 12.4,
        fats: 20.4,
        carbohydrate: 3.1,
        weight: 130,
      }),
      generateDetailInfo({
        productVariantId: 3,
        energy: 307.3,
        protein: 11.7,
        fats: 15.1,
        carbohydrate: 28.9,
        weight: 420,
      }),
      generateDetailInfo({
        productVariantId: 4,
        energy: 304.9,
        protein: 11.8,
        fats: 14.6,
        carbohydrate: 29.4,
        weight: 610,
      }),
      generateDetailInfo({
        productVariantId: 5,
        energy: 294.9,
        protein: 11.5,
        fats: 14,
        carbohydrate: 28.6,
        weight: 840,
      }),
      generateDetailInfo({
        productVariantId: 6,
        energy: 303.7,
        protein: 12.5,
        fats: 16.4,
        carbohydrate: 24.3,
        weight: 520,
      }),
      generateDetailInfo({
        productVariantId: 7,
        energy: 303.2,
        protein: 12.4,
        fats: 15.8,
        carbohydrate: 25.7,
        weight: 720,
      }),
      generateDetailInfo({
        productVariantId: 8,
        energy: 285.1,
        protein: 10.2,
        fats: 11.8,
        carbohydrate: 32.5,
        weight: 370,
      }),
      generateDetailInfo({
        productVariantId: 9,
        energy: 276.9,
        protein: 9.9,
        fats: 11.7,
        carbohydrate: 31.1,
        weight: 570,
      }),
      generateDetailInfo({
        productVariantId: 10,
        energy: 274.8,
        protein: 9.9,
        fats: 11.4,
        carbohydrate: 31.2,
        weight: 760,
      }),
      generateDetailInfo({
        productVariantId: 11,
        energy: 282.1,
        protein: 10.8,
        fats: 13.7,
        carbohydrate: 27.1,
        weight: 460,
      }),
      generateDetailInfo({
        productVariantId: 12,
        energy: 276.2,
        protein: 10.5,
        fats: 12.8,
        carbohydrate: 27.9,
        weight: 650,
      }),
      generateDetailInfo({
        productVariantId: 13,
        energy: 267.9,
        protein: 11,
        fats: 11.2,
        carbohydrate: 28.9,
        weight: 210,
      }),
      generateDetailInfo({
        productVariantId: 14,
        energy: 289.3,
        protein: 15.3,
        fats: 13.8,
        carbohydrate: 24,
        weight: 160,
      }),
      generateDetailInfo({
        productVariantId: 15,
        energy: 150,
        protein: 3,
        fats: 7,
        carbohydrate: 17.7,
        weight: 300,
      }),
      generateDetailInfo({
        productVariantId: 16,
        energy: 166.9,
        protein: 3.8,
        fats: 7.6,
        carbohydrate: 19.6,
        weight: 300,
      }),
      generateDetailInfo({
        productVariantId: 17,
        energy: 57.1,
        protein: 2.8,
        fats: 3.1,
        carbohydrate: 4.2,
        weight: 330,
      }),
      generateDetailInfo({
        productVariantId: 18,
        energy: 129.7,
        protein: 3.3,
        fats: 7.4,
        carbohydrate: 11.5,
        weight: 280,
      }),
      generateDetailInfo({
        productVariantId: 19,
        energy: 72.5,
        protein: 2.2,
        fats: 2.1,
        carbohydrate: 10.7,
        weight: 240,
      }),
      generateDetailInfo({
        productVariantId: 20,
        energy: 36,
        carbohydrate: 9,
      }),
      generateDetailInfo({
        productVariantId: 21,
        energy: 109,
        protein: 0.3,
        carbohydrate: 27,
        weight: 90,
      }),
      generateDetailInfo({
        productVariantId: 22,
        energy: 274.1,
        protein: 11.7,
        fats: 14.3,
        carbohydrate: 22.6,
        weight: 260,
      }),
      generateDetailInfo({
        productVariantId: 23,
        energy: 240,
        protein: 1.5,
        fats: 14,
        carbohydrate: 27,
        weight: 25,
      }),
      generateDetailInfo({
        productVariantId: 24,
        energy: 110,
        protein: 1,
        carbohydrate: 26,
        weight: 25,
      }),
    ],
    skipDuplicates: true,
  })

  // create Ingredients
  const createIgredients = () => {
    // Традиц маленьк
    generateIngredients({
      productVariantId: [3, 8],
      name: 'Сливочная моцарелла',
      price: 69,
      imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Сыры чеддер и пармезан',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Острый перец халапенью',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Нежный цыпленок',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Шампиньоны',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Бекон',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Ветчина',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Пикантная пепперони',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Острая чоризо',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Маринованные огурчики',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Свежие томаты',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Красный лук',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Сочные ананасы',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Итальянские травы',
        price: 29,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Сладкий перец',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Маслины',
        price: 49,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5EA513EF2',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Кубики брынзы',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Митболы',
        price: 69,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [3, 8],
        name: 'Креветки',
        price: 179,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11eee5d51d4c576da0f0db611c8947bd.png',
      }),
      // трандиц сред
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Сырный бортик',
        price: 179,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Острый перец халапенью',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Шампиньоны',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Бекон',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Ветчина',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Острая чоризо',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Свежие томаты',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Красный лук',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Сочные ананасы',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Итальянские травы',
        price: 39,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Сладкий перец',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Маслины',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5EA513EF2',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Кубики брынзы',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Митболы',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [4, 9],
        name: 'Креветки',
        price: 199,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11eee5d51d4c576da0f0db611c8947bd.png',
      }),
      // традиц больш
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Сырный бортик',
        price: 199,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Сливочная моцарелла',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Сыры чеддер и пармезан',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Острый перец халапенью',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Нежный цыпленок',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Шампиньоны',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Бекон',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Ветчина',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Пикантная пепперони',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Острая чоризо',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Маринованные огурчики',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Свежие томаты',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Красный лук',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Сочные ананасы',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Итальянские травы',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Сладкий перец',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Маслины',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5EA513EF2',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Кубики брынзы',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Митболы',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [5, 10],
        name: 'Креветки',
        price: 219,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11eee5d51d4c576da0f0db611c8947bd.png',
      }),
      // тонкое среднее
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Острый перец халапенью',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Шампиньоны',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Бекон',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Ветчина',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Острая чоризо',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Свежие томаты',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Красный лук',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Сочные ананасы',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Итальянские травы',
        price: 39,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Сладкий перец',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Маслины',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5EA513EF2',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Кубики брынзы',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Митболы',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [6, 11],
        name: 'Креветки',
        price: 199,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11eee5d51d4c576da0f0db611c8947bd.png',
      }),
      // тонкое большое
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Сливочная моцарелла',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Сыры чеддер и пармезан',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Острый перец халапенью',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Нежный цыпленок',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Шампиньоны',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Бекон',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Ветчина',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Пикантная пепперони',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Острая чоризо',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Маринованные огурчики',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Свежие томаты',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Красный лук',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Сочные ананасы',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Итальянские травы',
        price: 59,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Сладкий перец',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Маслины',
        price: 79,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5EA513EF2',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Кубики брынзы',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Митболы',
        price: 99,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
      }),
      generateIngredients({
        productVariantId: [7, 12],
        name: 'Креветки',
        price: 219,
        imageUrl:
          'https://cdn.dodostatic.net/static/Img/Ingredients/11eee5d51d4c576da0f0db611c8947bd.png',
      })
  }
  createIgredients()
}

const down = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "DefaultIngredient" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "DetailInfoProduct" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Basket" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "BasketProduct" RESTART IDENTITY CASCADE`
}

const main = async () => {
  try {
    await down()
    await up()
  } catch (error) {
    console.error(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
