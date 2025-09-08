import type { Prisma } from '@prisma/client'
import { prisma } from '../config/database.ts'
import { makeBcryptService } from '../src/factories/services/auth/bcryptjs.ts'

async function seed() {
  await prisma.news.deleteMany()
  await prisma.team.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.user.deleteMany()

  const bcrypt = makeBcryptService()

  const user: Prisma.UserCreateInput = {
    emailAddress: 'anderkaiti@gmail.com',
    name: 'Anderson Kaiti',
    passwordHash: await bcrypt.hash('123456789'),
    role: 'ADMIN',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fuser-mocks%2FChatGPT%20Image%2024%20de%20ago.%20de%202025%2C%2023_05_38.jpg?alt=media&token=36ddf5df-531e-4d3a-a124-a52819d3ee76',
    phone: '14998053657',
    orcid: null,
    lattesUrl: null,
  }

  const data = await prisma.user.create({
    data: user,
  })

  const news: Prisma.NewsCreateManyInput[] = [
    {
      title:
        'Operação contra o Garimpo Ilegal na Terra Indígena Yanomami Ganha Novo Fôlego',
      content:
        'Uma nova fase da operação de combate ao garimpo ilegal na Terra Indígena Yanomami, em Roraima, foi intensificada. A ação, coordenada pelo governo federal, visa expulsar os invasores e destruir a infraestrutura utilizada para a atividade criminosa. As lideranças Yanomami celebram o avanço, mas alertam que a presença de garimpeiros ainda representa uma ameaça constante à saúde e segurança de suas comunidades. A operação busca restaurar o meio ambiente degradado e garantir o acesso à saúde para a população local, que sofre com doenças como malária e desnutrição.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F1.png?alt=media&token=20587721-c3fd-46fc-8859-5031d89ee248',
      authorId: data.id,
    },
    {
      title:
        'Mulheres Indígenas Lideram Movimento de Agrofloresta no Mato Grosso',
      content:
        'No Mato Grosso, um grupo de mulheres indígenas de diferentes etnias está liderando um projeto inovador de recuperação de áreas desmatadas. Utilizando conhecimentos ancestrais e técnicas de agrofloresta, elas estão plantando espécies nativas e frutíferas para restaurar a floresta e, ao mesmo tempo, garantir a segurança alimentar de suas famílias. O projeto não só combate o desmatamento, mas também fortalece o protagonismo feminino e a autonomia econômica nas aldeias. A iniciativa tem atraído a atenção de pesquisadores e ONGs que buscam modelos de desenvolvimento sustentável.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F2.png?alt=media&token=fdcd7fc6-6b1a-4a97-8d40-f756a43fe622',
      authorId: data.id,
    },
    {
      title:
        'Indígenas do Equador Obtêm Vitórias Legais contra o Estado em Defesa de Terras Ancestrais',
      content:
        'A Corte Interamericana de Direitos Humanos (CIDH) proferiu uma decisão histórica a favor dos povos indígenas do Equador. A sentença reconhece que o governo equatoriano violou os direitos de consulta prévia e consentimento livre e informado ao autorizar projetos extrativistas em terras ancestrais sem a devida participação das comunidades. O caso cria um precedente importante para a proteção dos direitos territoriais dos povos originários em toda a América Latina e fortalece a luta contra a exploração de recursos naturais em seus territórios.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F3.png?alt=media&token=7c9df67d-2987-4d69-a349-038f1683cb21',
      authorId: data.id,
    },
    {
      title:
        'Festival de Cinema Indígena em Belém Anuncia Recorde de Inscrições para a COP30',
      content:
        'O Festival de Cinema Indígena, que acontece em Belém, no Pará, anunciou um número recorde de filmes inscritos para sua próxima edição, que será realizada em paralelo à Conferência das Nações Unidas sobre Mudanças Climáticas (COP30). A iniciativa busca dar voz aos cineastas indígenas e destacar a importância de seus conhecimentos na luta contra a crise climática. A curadoria do festival focará em obras que abordam temas como a preservação da floresta, a cultura e a resistência dos povos originários.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F4.png?alt=media&token=288f518b-2325-4e9b-a146-b3c5ed814182',
      authorId: data.id,
    },
    {
      title:
        'Estudantes Indígenas na Universidade: Mais de 500 Vagas para Acesso Diferenciado',
      content:
        'As universidades públicas de diferentes estados brasileiros estão ampliando as vagas destinadas a estudantes indígenas. Mais de 500 vagas estão disponíveis em cursos de graduação, por meio de processos seletivos específicos, que consideram o contexto cultural e social dos candidatos. A medida visa democratizar o acesso ao ensino superior e formar novos profissionais que possam contribuir com o desenvolvimento de suas comunidades e a preservação de suas culturas.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F5.png?alt=media&token=e0463818-337e-4349-9e32-4d4b5ed3fbf7',
      authorId: data.id,
    },
    {
      title:
        'Pesquisadores e Indígenas Desvendam Rituais Funerários Antigos na Amazônia',
      content:
        'Uma equipe de arqueólogos, em parceria com lideranças indígenas, fez uma descoberta significativa na Amazônia. Urnas funerárias de cerâmica, com cerca de 1.500 anos, foram encontradas, revelando detalhes sobre rituais e costumes de povos antigos que habitavam a região. A colaboração entre pesquisadores e indígenas foi fundamental para o sucesso da escavação, demonstrando a importância do conhecimento ancestral na pesquisa científica.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F6.png?alt=media&token=b7f545e6-1cf8-41cd-9e41-7ae8cb0dc44c',
      authorId: data.id,
    },
    {
      title:
        'União Europeia Adota Medidas Mais Rígidas contra a Importação de Produtos Ligados ao Desmatamento em Terras Indígenas',
      content:
        'Em um movimento para combater o desmatamento, a União Europeia (UE) aprovou uma nova regulamentação que proíbe a importação de produtos agrícolas e pecuários, como soja, carne e café, que estejam ligados à destruição de florestas. A medida inclui a verificação da origem dos produtos, com atenção especial às áreas de conflito, como as terras indígenas. A regulamentação é vista como um importante avanço na proteção dos direitos territoriais e ambientais dos povos originários.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F7.png?alt=media&token=abb8e0ea-94f7-412e-bab2-4c54cc79b1fe',
      authorId: data.id,
    },
    {
      title:
        'Lideranças Mundiais se Unem para Lançar Fundo de Proteção aos Povos Isolados',
      content:
        'Em uma conferência internacional, líderes de governos e organizações se comprometeram a criar um fundo global para a proteção dos povos indígenas isolados, aqueles que vivem sem contato com a sociedade moderna. O fundo visa garantir a integridade de seus territórios e protegê-los de invasões, doenças e violência. O lançamento do fundo é um reconhecimento da urgência em proteger essas comunidades, que são as mais vulneráveis do planeta.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F8.png?alt=media&token=e1ac5549-3a21-4dc4-8b97-5a20b72ebc7b',
      authorId: data.id,
    },
    {
      title:
        'Ministra Sonia Guajajara Lança Campanha Nacional de Documentação Civil para Indígenas',
      content:
        'O Ministério dos Povos Indígenas, em parceria com a Funai, lançou uma campanha nacional para garantir o acesso à documentação civil para indígenas que vivem em aldeias e áreas urbanas. A iniciativa busca emitir RGs, CPFs e certidões de nascimento, que são essenciais para que os indígenas possam acessar direitos sociais e políticas públicas, como saúde, educação e programas de transferência de renda.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F9.png?alt=media&token=91a1b8e6-9a13-47ef-aa2b-0e0e6d2d709d',
      authorId: data.id,
    },
    {
      title:
        'Comunicação Indígena Ganha Força com o Lançamento de Rede de Notícias e PodCasts',
      content:
        'Uma nova plataforma digital, criada e gerida por comunicadores indígenas, foi lançada com o objetivo de dar voz às comunidades e combater as narrativas distorcidas sobre os povos originários. A rede de notícias e podcasts irá cobrir temas como política, meio ambiente, cultura e lutas por direitos, fortalecendo a autonomia e o protagonismo dos povos indígenas no cenário midiático nacional e internacional.',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/rede-ct.firebasestorage.app/o/images%2Fnews-mocks%2F10.png?alt=media&token=a27e0db3-8d79-4b55-baaa-0b69b8e07503',
      authorId: data.id,
    },
  ]

  const now = new Date()
  const MINUTES_BETWEEN_NEWS = 60_000

  const newsWithDate = news.map((notice, index) => ({
    ...notice,
    createdAt: new Date(now.getTime() - index * MINUTES_BETWEEN_NEWS),
    updatedAt: new Date(now.getTime() - index * MINUTES_BETWEEN_NEWS),
  }))

  await prisma.news.createMany({
    data: newsWithDate,
  })

  await prisma.team.createMany({
    data: [
      {
        name: 'Comitê Legitimador',
        type: 'comite-legitimador',
        description:
          'Comitê responsável por validar e legitimar decisões estratégicas, garantindo a representatividade e a transparência nos processos da rede.',
      },
      {
        name: 'Equipe SDHC',
        type: 'equipe-sdhc',
        description:
          'Equipe dedicada à promoção dos direitos humanos e cidadania, atuando em projetos e ações voltados à inclusão, diversidade e justiça social.',
      },
      {
        name: '(Informática)',
        type: 'equipe-de-gestao',
      },
    ],
  })

  const teamsList = await prisma.team.findMany({
    where: {
      type: {
        in: ['comite-legitimador', 'equipe-sdhc', 'equipe-de-gestao'],
      },
    },
  })

  for (const team of teamsList) {
    await prisma.teamMember.create({
      data: {
        userId: data.id,
        teamId: team.id,
        role: 'Coordenador',
      },
    })
  }
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
