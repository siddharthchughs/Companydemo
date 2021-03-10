import SwiftUI

protocol NamedItem {
    var name: String { get }
}

struct NamedItemRow: View {
    let item: NamedItem

    var body: some View {
        HStack {
            Text(item.name)
                .font(.customFont(forTextStyle: .body))
            Spacer()
        }
    }
}

struct NamedItemRow_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            NamedItemRow(item: interventions[0].modules[0])
            NamedItemRow(item: surveys[0])
            NamedItemRow(item: surveys[1])
        }
        .previewLayout(.fixed(width: 300, height: 45))
    }
}
