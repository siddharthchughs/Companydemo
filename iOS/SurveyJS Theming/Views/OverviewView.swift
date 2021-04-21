import SwiftUI

struct OverviewView: UIViewControllerRepresentable {
    @Environment(\.presentationMode) var presentationMode
    
    class Coordinator: NSObject, OverviewViewControllerDelegate {
        var parent: OverviewView
        
        init(_ parent: OverviewView) {
            self.parent = parent
        }
        
        func getOverviewViewControllerDidFinish(_ controller: OverviewViewController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    func makeUIViewController(context: Context) -> OverviewViewController {
        let controller = OverviewViewController()
        controller.delegate = context.coordinator
        return controller
    }
    
    func updateUIViewController(_ uiViewController: OverviewViewController, context: Self.Context) {}
}

struct OverviewView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            OverviewView()
        }
    }
}
