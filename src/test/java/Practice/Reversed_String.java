package Practice;

public class Reversed_String {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s= "My Name is Swamy ";
		String[] words=s.split(" ");
		StringBuilder sb=new StringBuilder();
		String ss="";
		 String revString="";
		
		 for(String chi:words) {
			 
			 for(int i=chi.length()-1;i>=0;i--) {
				 ss=ss+chi.charAt(i);
			 }
			 revString=revString+ss+" ";
			 ss="";
		 }
		 System.out.println("Original Name       : "+s);
		 System.out.println("Reverse names Words : "+revString);
		 
		 for(int j=words.length-1;j>=0;j--) {
			 sb.append(words[j]);
			 sb.append(" ");
		 }
		 System.out.println("Reverse Words       : "+sb);
		 String sbbs=sb.toString();
		 
		 String[] sbs=sbbs.split(" ");
		 String sbb2="";
		 String sbb3="";
		 for(String sbb1:sbs) {
			 for(int i=sbb1.length()-1;i>=0;i--) {
				 sbb2=sbb2+sbb1.charAt(i);
				 
			 }
			 sbb3=sbb3+sbb2+" ";
			 sbb2="";
		 }
		 System.out.println("Reverse Words Names : "+sbb3);
		 
	}

}
