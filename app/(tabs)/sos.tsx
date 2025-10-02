import { Text, View } from "@/components/Themed";
import { ScrollView, StyleSheet } from "react-native";

export default function TabFiveScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Seja a diferença que você quer ver no mundo
      </Text>
      <View style={styles.separator} />

      <View style={styles.margins}>
        <Text style={[styles.bold, styles.center, styles.topMargin]}>
          Onde buscar ajuda em casos de violência contra a pessoa idosa
        </Text>

        <Text style={styles.paragraph}>
          Se você presenciar ou suspeitar que uma pessoa idosa esteja sofrendo{" "}
          <Text style={styles.bold}>
            maus-tratos, abandono, negligência ou qualquer tipo de violência
          </Text>
          , é fundamental denunciar.
        </Text>

        <Text style={styles.paragraph}>
          Situações como idosos doentes sem cuidados, com sinais de agressão,
          vivendo em condições insalubres ou sem assistência adequada devem ser
          comunicadas imediatamente.
        </Text>

        <Text style={[styles.bold, styles.center, styles.sectionTitle]}>
          Canais de denúncia e apoio
        </Text>

        <Text style={[styles.bold, styles.marginTop]}>Disque 100</Text>
        <Text style={styles.paragraph}>
          Canal nacional para registrar denúncias de violações de Direitos
          Humanos, incluindo violência contra idosos.
        </Text>

        <Text style={styles.bold}>
          Conselho Municipal dos Direitos da Pessoa Idosa
        </Text>
        <Text style={styles.paragraph}>
          Atua na defesa e garantia dos direitos da população idosa.{" "}
          <Text style={styles.italic}>
            Rua Ladário Cardoso de Paula, nº 114 (64) 3404-1012
          </Text>
        </Text>

        <Text style={styles.bold}>Delegacia de Polícia</Text>
        <Text style={styles.paragraph}>
          Procure qualquer delegacia da cidade ou ligue 190 nos seguintes casos:
        </Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Quando a pessoa idosa for vítima de crimes (roubo, furto,
            agressões, cárcere privado, negligência etc.);
          </Text>
          <Text style={styles.listItem}>
            • Se houver desaparecimento do idoso;
          </Text>
          <Text style={styles.listItem}>
            • Em caso de perda de documentos ou cartões de benefícios.
          </Text>
        </View>

        <Text style={styles.bold}>Ministério Público</Text>
        <Text style={styles.paragraph}>
          Responsável por garantir o cumprimento dos direitos da pessoa idosa.
          Deve ser acionado quando:
        </Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Houver risco ou abandono por parte da família;
          </Text>
          <Text style={styles.listItem}>
            • Forem identificados maus-tratos em instituições de acolhimento;
          </Text>
          <Text style={styles.listItem}>
            • Direitos forem desrespeitados (ex.: falta de acessibilidade ou
            descumprimento da prioridade no atendimento).
          </Text>
        </View>

        <Text style={styles.italic}>
          5ª Promotoria - Avenida João Paulo II, nº 255, Bairro Dom Bosco,
          Itumbiara-GO (64) 9 9331-0519
        </Text>

        <Text style={[styles.bold, styles.marginTop]}>
          CREAS - Centro de Referência Especializado de Assistência Social
        </Text>
        <Text style={styles.paragraph}>
          Oferece suporte a idosos em situação de ameaça ou violação de
          direitos, prestando acompanhamento psicossocial e fortalecendo
          vínculos familiares e comunitários.
        </Text>
        <Text style={styles.paragraph}>
          Também articula a rede de serviços públicos para garantir proteção em
          casos de violência física, psicológica, sexual ou de risco pessoal.
        </Text>
        <Text style={styles.italic}>
          Rua Novacap, nº 18, Centro, (64) 3433-0492
        </Text>

        <Text style={[styles.bold, styles.marginTop]}>
          CRAS - Centro de Referência de Assistência Social
        </Text>
        <Text style={styles.paragraph}>
          Focado na proteção social básica, o CRAS auxilia idosos em situação de
          vulnerabilidade, promovendo atividades de convivência, oficinas, lazer
          e orientação sobre benefícios como o BPC. Seu objetivo é prevenir o
          isolamento e melhorar a qualidade de vida da pessoa idosa.
        </Text>

        <View style={styles.list}>
          <Text style={styles.bold}>CRAS Buriti</Text>
          <Text style={styles.listItem}>
            Av. Cícero Marques, nº 245, Buriti 1 - Itumbiara-GO
          </Text>
          <Text style={styles.listItem}>(64) 99279-6466</Text>

          <Text style={[styles.bold, styles.listSpacing]}>
            CRAS Novo Horizonte
          </Text>
          <Text style={styles.listItem}>
            Rua Sumaré, nº 185, St. Planalto - Itumbiara-GO
          </Text>
          <Text style={styles.listItem}>(64) 99251-6038</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  center: {
    textAlign: "center",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
    backgroundColor: "#6B46C1",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    color: "#620cb8ff",
  },
  margins: {
    margin: 40,
  },
  topMargin: {
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "justify",
  },
  bold: {
    color: "#620cb8ff",
    fontSize: 18,

    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 16,
  },
  list: {
    marginLeft: 16,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  listSpacing: {
    marginTop: 12,
  },
});
