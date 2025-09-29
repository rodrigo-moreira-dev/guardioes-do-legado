import { Text, View } from "@/components/Themed";
import { ScrollView, StyleSheet } from "react-native";

export default function TabFiveScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SOS</Text>
      <View style={styles.margins}>
        <strong style={styles.center}>
          Onde buscar ajuda em casos de violência contra a pessoa idosa
        </strong>
        <p>
          Se você presenciar ou suspeitar que uma pessoa idosa esteja sofrendo{" "}
          <strong>
            maus-tratos, abandono, negligência ou qualquer tipo de violência
          </strong>
          , é fundamental denunciar.
        </p>
        <p>
          Situações como idosos doentes sem cuidados, com sinais de agressão,
          vivendo em condições insalubres ou sem assistência adequada devem ser
          comunicadas imediatamente.
        </p>
        <strong style={styles.center}>Canais de denúncia e apoio</strong>
        <strong style={styles.marginTop}>Disque 100</strong>
        <p>
          Canal nacional para registrar denúncias de violações de Direitos
          Humanos, incluindo violência contra idosos.
        </p>
        <strong>Conselho Municipal dos Direitos da Pessoa Idosa</strong>
        <p>
          Atua na defesa e garantia dos direitos da população idosa.{" "}
          <i>Rua Ladário Cardoso de Paula, nº 114 (64) 3404-1012</i>
        </p>
        <strong>Delegacia de Polícia</strong>
        <p>
          Procure qualquer delegacia da cidade ou ligue 190 nos seguintes casos:
        </p>
        <ul>
          <li>
            Quando a pessoa idosa for vítima de crimes (roubo, furto, agressões,
            cárcere privado, negligência etc.);
          </li>
          <li>Se houver desaparecimento do idoso;</li>
          <li>Em caso de perda de documentos ou cartões de benefícios.</li>
        </ul>
        <strong>Ministério Público</strong>
        <p>
          Responsável por garantir o cumprimento dos direitos da pessoa idosa.
          Deve ser acionado quando:
        </p>
        <ul>
          <li>Houver risco ou abandono por parte da família;</li>
          <li>
            Forem identificados maus-tratos em instituições de acolhimento;
          </li>
          <li>
            Direitos forem desrespeitados (ex.: falta de acessibilidade ou
            descumprimento da prioridade no atendimento).
          </li>
        </ul>
        <i>
          5ª Promotoria - Avenida João Paulo II, nº 255, Bairro Dom Bosco,
          Itumbiara-GO (64) 9 9331-0519
        </i>
        <strong style={styles.marginTop}>
          CREAS - Centro de Referência Especializado de Assistência Social
        </strong>
        <p>
          Oferece suporte a idosos em situação de ameaça ou violação de
          direitos, prestando acompanhamento psicossocial e fortalecendo
          vínculos familiares e comunitários.
        </p>
        <p>
          Também articula a rede de serviços públicos para garantir proteção em
          casos de violência física, psicológica, sexual ou de risco pessoal.
        </p>
        <i>Rua Novacap, nº 18, Centro, (64) 3433-0492</i>
        <strong style={styles.marginTop}>
          CRAS - Centro de Referência de Assistência Social
        </strong>
        <p>
          Focado na proteção social básica, o CRAS auxilia idosos em situação de
          vulnerabilidade, promovendo atividades de convivência, oficinas, lazer
          e orientação sobre benefícios como o BPC. Seu objetivo é prevenir o
          isolamento e melhorar a qualidade de vida da pessoa idosa.
        </p>
        <ul>
          <li>
            <strong>CRAS Buriti</strong> - Av. Cícero Marques, nº 245, Buriti 1
            - Itumbiara-GO
          </li>
          <li>(64) 99279-6466</li>
          <li>
            <strong>CRAS Novo Horizonte</strong> - Rua Sumaré, nº 185, St.
            Planalto - Itumbiara-GO
          </li>
          <li>(64) 99251-6038</li>
        </ul>
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
    fontSize: 26,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  margins: {
    margin: 40,
  },
});
