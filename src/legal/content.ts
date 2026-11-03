// Termos de Uso e Política de Privacidade do App Ludus (IFMA Campus Timon).
// Mesmo conteúdo das telas do app (Sistema-Ludus, src/screens/Terms): ao mudar uma regra, atualize os dois.

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'points'; caption: string; rows: { event: string; value: number; note?: string }[] }
  | { type: 'note'; text: string };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  id: 'termos' | 'privacidade';
  eyebrow: string;
  title: string;
  summary: string;
  version: string;
  updatedAt: string; // AAAA-MM-DD
  sections: LegalSection[];
}

export const TERMS: LegalDoc = {
  id: 'termos',
  eyebrow: 'Termo de compromisso',
  title: 'Termos de Uso',
  summary:
    'Regras para alugar jogos pelo App Ludus no IFMA Campus Timon: quem pode usar, como funcionam a retirada e a devolução, os pontos e as categorias.',
  version: '1.1',
  updatedAt: '2026-11-02',
  sections: [
    {
      id: 'quem-pode-usar',
      title: 'Quem pode usar',
      blocks: [
        {
          type: 'p',
          text: 'O App Ludus disponibiliza aos alunos regularmente matriculados e aos servidores ativos do IFMA Campus Timon uma coleção de jogos de tabuleiro para aluguel gratuito.',
        },
        {
          type: 'p',
          text: 'Cada usuário só pode alugar jogos dentro da sua categoria de cadastro (aluno ou servidor), conforme estes Termos. Não há flexibilização do perfil do usuário.',
        },
      ],
    },
    {
      id: 'cadastro',
      title: 'Cadastro e responsabilidade',
      blocks: [
        {
          type: 'p',
          text: 'O usuário é responsável pela veracidade das informações fornecidas no cadastro e responde civil e criminalmente por informações incorretas.',
        },
        {
          type: 'p',
          text: 'Ao se cadastrar, o usuário assume todas as obrigações descritas nestes Termos, cuja leitura é obrigatória.',
        },
      ],
    },
    {
      id: 'aluguel',
      title: 'Aluguel gratuito',
      blocks: [
        {
          type: 'p',
          text: 'O aluguel dos jogos é gratuito. Não há cobrança pelo uso, desde que o jogo seja devolvido nas mesmas condições em que foi retirado.',
        },
      ],
    },
    {
      id: 'retirada-e-devolucao',
      title: 'Retirada e devolução',
      blocks: [
        {
          type: 'list',
          items: [
            'Não há entrega nem retirada de jogos fora do Campus Timon.',
            'A retirada e a devolução acontecem no mesmo dia, na biblioteca, dentro do horário de funcionamento: segunda a sexta, das 8h às 19h. Para jogar de novo em outro dia, basta fazer uma nova reserva.',
            'No ato da retirada, os componentes do jogo são conferidos na presença de um funcionário ou monitor do App Ludus.',
            'Há tolerância de 30 minutos após o horário marcado para a retirada. Quem não comparece nesse prazo tem a reserva encerrada.',
            'Na devolução, os componentes são conferidos novamente por um funcionário ou monitor. Em caso de peças ou cartas faltando, sujeira excessiva ou avaria em qualquer componente (caixa, peças, manual etc.), o usuário fica responsável pela reposição do item danificado ou faltante, conforme orientação da biblioteca.',
          ],
        },
      ],
    },
    {
      id: 'cancelamento',
      title: 'Cancelamento de reserva',
      blocks: [
        {
          type: 'p',
          text: 'A reserva pode ser cancelada pelo próprio app. O cancelamento só tira pontos quando é feito com menos de 2 horas de antecedência do horário da retirada.',
        },
      ],
    },
    {
      id: 'pontos',
      title: 'Pontos',
      blocks: [
        {
          type: 'p',
          text: 'Cada aluguel gera pontos de acordo com o cuidado com o jogo e com os prazos. Os pontos aparecem no perfil e no ranking da temporada.',
        },
        {
          type: 'points',
          caption: 'Pontos por situação',
          rows: [
            { event: 'Retirada confirmada na biblioteca', value: 5 },
            { event: 'Devolução no prazo', value: 5 },
            { event: 'Cancelamento com menos de 2 horas de antecedência', value: -2 },
            { event: 'Não comparecimento na retirada (após 30 minutos)', value: -5 },
            {
              event: 'Devolução com atraso',
              value: -10,
              note: 'Enquanto o jogo estiver em atraso, não é possível fazer novas reservas.',
            },
            { event: 'Jogo devolvido com avaria ou peças faltando', value: -20 },
          ],
        },
        {
          type: 'p',
          text: 'Persistindo o atraso na devolução, o cadastro poderá ser suspenso até a situação ser regularizada.',
        },
      ],
    },
    {
      id: 'categorias',
      title: 'Categorias de acesso',
      blocks: [
        {
          type: 'p',
          text: 'A categoria do usuário define quais jogos do acervo ele pode alugar. Ela sobe ao completar 11, 31 e 61 aluguéis devolvidos no prazo e sem avaria.',
        },
      ],
    },
    {
      id: 'temporadas',
      title: 'Temporadas e brindes',
      blocks: [
        {
          type: 'p',
          text: 'As recompensas de temporada são brindes. O código do brinde aparece no app e deve ser mostrado na biblioteca para a retirada.',
        },
        {
          type: 'list',
          items: [
            'Cada código vale uma única vez.',
            'O código pode ser usado até o fim da temporada seguinte.',
          ],
        },
      ],
    },
    {
      id: 'catalogo-e-suspensao',
      title: 'Catálogo e suspensão',
      blocks: [
        {
          type: 'p',
          text: 'A critério dos administradores do App Ludus, qualquer jogo pode ser retirado do catálogo de aluguel.',
        },
        {
          type: 'p',
          text: 'O App Ludus pode suspender o cadastro de um usuário conforme as regras do sistema. Nesse caso, o usuário é avisado do motivo, as reservas pendentes são canceladas sem perda de pontos e um jogo que já esteja com ele deve ser devolvido normalmente.',
        },
      ],
    },
    {
      id: 'convivencia',
      title: 'Boa convivência',
      blocks: [
        {
          type: 'p',
          text: 'O aluguel de jogos do App Ludus no Campus Timon é uma iniciativa para ampliar o acesso aos jogos de tabuleiro e incentivar a cultura lúdica entre alunos e servidores. Cuide dos jogos como se fossem seus, para que mais pessoas possam aproveitar.',
        },
        {
          type: 'p',
          text: 'Para compartilhar sua experiência, publique fotos das suas partidas nos grupos oficiais do App Ludus ou marque o perfil do App Ludus no Instagram com a hashtag #aluguelappludus.',
        },
      ],
    },
    {
      id: 'alteracoes',
      title: 'Alterações destes Termos',
      blocks: [
        {
          type: 'p',
          text: 'Estes Termos podem ser atualizados para refletir mudanças nas regras de aluguel ou no funcionamento do app. A versão e a data da última atualização ficam sempre no topo desta página e na tela de Termos do app.',
        },
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  id: 'privacidade',
  eyebrow: 'LGPD · Lei nº 13.709/2018',
  title: 'Política de Privacidade',
  summary:
    'Como o App Ludus coleta, usa, guarda e protege os dados de quem aluga jogos no IFMA Campus Timon, e como você pode exercer seus direitos.',
  version: '1.1',
  updatedAt: '2026-11-02',
  sections: [
    {
      id: 'finalidade',
      title: 'Finalidade',
      blocks: [
        {
          type: 'p',
          text: 'Esta política descreve como o App Ludus coleta, utiliza e protege os dados fornecidos pelos usuários durante o uso do aplicativo e do painel administrativo da biblioteca.',
        },
      ],
    },
    {
      id: 'dados-coletados',
      title: 'Dados que coletamos',
      blocks: [
        {
          type: 'list',
          items: [
            'Dados de cadastro: nome, e-mail institucional, telefone e matrícula.',
            'Foto de perfil, quando enviada pelo usuário.',
            'Documento de identidade e comprovante de matrícula, usados apenas para aprovar o cadastro.',
            'Dados de autenticação, como a conta Google usada no login e a verificação do telefone.',
            'Dados de uso do sistema: reservas, empréstimos, devoluções, pontos, favoritos e avisos solicitados.',
            'Identificador do aparelho para envio de notificações.',
          ],
        },
      ],
    },
    {
      id: 'uso',
      title: 'Como usamos os dados',
      blocks: [
        {
          type: 'list',
          items: [
            'Permitir a autenticação e o acesso seguro à conta.',
            'Aprovar o cadastro e confirmar o vínculo com o Campus Timon.',
            'Gerenciar reservas, empréstimos, devoluções, pontos, categorias e brindes.',
            'Enviar notificações e e-mails sobre a conta e os aluguéis.',
            'Garantir a organização, a segurança e a integridade do acervo e das operações do Ludus.',
          ],
        },
        {
          type: 'p',
          text: 'O Ludus não usa os dados para publicidade e não rastreia o usuário em apps ou sites de terceiros.',
        },
      ],
    },
    {
      id: 'documentos',
      title: 'Documentos do cadastro',
      blocks: [
        {
          type: 'p',
          text: 'O documento de identidade e o comprovante de matrícula ficam disponíveis apenas para a equipe da biblioteca durante a análise do cadastro. Depois da aprovação, os arquivos são apagados e fica registrado somente quem aprovou o cadastro e quando.',
        },
      ],
    },
    {
      id: 'compartilhamento',
      title: 'Compartilhamento',
      blocks: [
        {
          type: 'p',
          text: 'Os dados não são compartilhados com terceiros fora das finalidades institucionais e operacionais do sistema, exceto quando necessário para autenticação, comunicação ou cumprimento de exigências legais. Para funcionar, o Ludus usa os seguintes serviços:',
        },
        {
          type: 'list',
          items: [
            'Google e Firebase: login com conta Google e verificação do telefone.',
            'Cloudinary: armazenamento de fotos de perfil e documentos do cadastro.',
            'Expo: envio de notificações para o aparelho.',
            'Resend: envio de e-mails.',
            'Railway: hospedagem do servidor e do banco de dados.',
            'Sentry: registro de erros técnicos do servidor.',
          ],
        },
      ],
    },
    {
      id: 'protecao',
      title: 'Proteção dos dados',
      blocks: [
        {
          type: 'p',
          text: 'O Ludus adota medidas de segurança para proteger os dados contra acessos não autorizados, uso indevido, perda ou alteração. O acesso aos dados pessoais no painel administrativo é restrito à equipe da biblioteca.',
        },
      ],
    },
    {
      id: 'retencao',
      title: 'Retenção e exclusão',
      blocks: [
        {
          type: 'p',
          text: 'Os dados ficam guardados enquanto a conta existir. O próprio usuário pode excluir a conta no app, em Perfil › Conta › Excluir minha conta.',
        },
        {
          type: 'p',
          text: 'Na exclusão, os dados pessoais, os documentos e a foto são apagados. Os aluguéis já feitos continuam no histórico da biblioteca, sem identificar o usuário.',
        },
      ],
    },
    {
      id: 'direitos',
      title: 'Seus direitos',
      blocks: [
        {
          type: 'p',
          text: 'Conforme a Lei Geral de Proteção de Dados (LGPD), o usuário pode:',
        },
        {
          type: 'list',
          items: [
            'Consultar os dados vinculados à própria conta.',
            'Pedir a correção ou atualização de dados cadastrais.',
            'Entender como o sistema utiliza suas informações.',
            'Excluir a própria conta e os dados pessoais.',
          ],
        },
      ],
    },
    {
      id: 'atualizacoes',
      title: 'Atualizações desta política',
      blocks: [
        {
          type: 'p',
          text: 'Esta política pode ser atualizada para refletir melhorias no sistema, ajustes legais ou mudanças no funcionamento do aplicativo. A versão e a data da última atualização ficam sempre no topo desta página e na tela de Política de Privacidade do app.',
        },
      ],
    },
  ],
};

export const LEGAL_DOCS = { termos: TERMS, privacidade: PRIVACY } as const;
